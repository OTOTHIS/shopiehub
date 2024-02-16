<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Product::getPaginatedProducts(5);
    
        // Transform the structure as needed
        $transformedData = $data->map(function ($product) {
            return [
                'image' => $product->image,
                'title' => $product->title,
                'id' => $product->id,
                'price' => $product->price,
                'category_name' => optional($product->category)->name,
                'magazin_name' => optional($product->magazins)->name,
            ];
        });
    
        $pagination = [
            'current_page' => $data->currentPage(),
            'last_page' => $data->lastPage(),
            'total' => $data->total(),
            'per_page' => $data->perPage(),
            'prev_page_url' => $data->previousPageUrl(),
            'next_page_url' => $data->nextPageUrl(),
            'path' => $data->path(),
            'from' => $data->firstItem(),
            'to' => $data->lastItem(),
        ];
    
        return response()->json(['data' => $transformedData, 'pagination' => $pagination], 200);
    }
    public function getProductsForHomePage()
    {
        $products = Product::with('category', 'magazins')
            ->has('category') // Only products with a valid category relationship
            ->has('magazins') // Only products with a valid magazin relationship
            ->take(5)
            ->get();

        $transformedProducts = $products->map(function ($product) {
            return [
                'image' => $product->image,
                'title' => $product->title,
                'id' => $product->id,
                'price' => $product->price,
                'category_name' => optional($product->category)->name,
                'magazin_name' => optional($product->magazins)->name,
            ];
        });

        return response()->json(['data' => $transformedProducts], 200);
    }

    public function getProductsForDetailsPage($id)
    {



        $data = product::with('category', 'magazins')->where("id", $id)->first();
        return response()->json([
            'image' => $data->image,
            'title' => $data->title,
            'id' => $data->id,
            'price' => $data->price,
            'category_name' => optional($data->category)->name,
            'magazin_name' => optional($data->magazins)->name,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'magazin_id' => 'required|exists:magazins,id',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:6048', // Image validation rules
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $uploadedImage = $request->file('image');
            $imagePath = $uploadedImage->store('images/products'); // You can customize the storage path

            // You may also want to save the image path in the database
            $validatedData['image'] = $imagePath;
        }

        // Create a new product using Eloquent
        $product = Product::create($validatedData);

        // Return a response, e.g., the newly created product
        return response()->json($product, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    //     public function destroy(Product $product)
// {
    // Delete the product
    // $product->delete();

    // return response()->json(['message' => 'Product deleted successfully']);

    public function destroy(Product $product)
    {


        $file_path = $product->image;
        //   $img = "images/products/ypSqWRtx7EbHfNynnmgcpBu1jCtGz09altoCsQor.png" ;

        // If the image path exists, attempt to delete the corresponding image file
        if ($file_path) {
            try {

                // Delete the image
                if (Storage::disk('local')->exists($file_path)) {
                    Storage::disk('local')->delete($file_path);
                    $product->delete();
                    // Image deleted successfully
                } else {
                    return response()->json(['message' => 'file not exist'], 404);
                }

            } catch (\Exception $e) {
                // Log or handle the exception as needed
                \Log::error("Error deleting image: {$e->getMessage()}");
            }
        }

        return response()->json(['message' => 'Product and associated image deleted successfully']);
    }



}

