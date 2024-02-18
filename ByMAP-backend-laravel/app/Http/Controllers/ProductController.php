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
        $data = Product::getPaginatedProducts(25);
        $data->transform(function ($product) {
            // Remove "images/" from the image path stored in the database
            $imagePathWithoutImages = str_replace('images/', '', $product->image);
            
            // Adjust the image URL based on the modified path
            $product->image_url = asset("storage/{$imagePathWithoutImages}");
            
            return $product;
        });
        // Transform the structure as needed
        $transformedData = $data->map(function ($product) {
            return [
                'image' => $product->image_url,
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

            $products->transform(function ($product) {
                // Remove "images/" from the image path stored in the database
                $imagePathWithoutImages = str_replace('images/', '', $product->image);
                
                // Adjust the image URL based on the modified path
                $product->image_url = asset("storage/{$imagePathWithoutImages}");
                
                return $product;
            });
              
        $transformedProducts = $products->map(function ($product) {
            return [
                'image' => $product->image_url,
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
        $product = Product::with('category', 'magazins')->find($id);
    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        // Remove "images/" from the image path stored in the database
        $imagePathWithoutImages = str_replace('images/', '', $product->image);
    
        // Adjust the image URL based on the modified path
        $image_url = asset("storage/{$imagePathWithoutImages}");
    
        return response()->json([
            'image' => $image_url,
            'title' => $product->title,
            'id' => $product->id,
            'price' => $product->price,
            'description' => $product->description,
            'category_name' => $product->category->name,
            'magazin_name' => optional($product->magazins)->name,
        ], 200);
    }




    public function getAllProductsWithFilters(Request $request)
    {
        $query = Product::query();
        
        // Apply filters based on request parameters
        if ($request->has('categories')) {
            $categories = $request->input('categories');
        
            $query->whereHas('category', function ($categoryQuery) use ($categories) {
                $categoryQuery->whereIn('name', $categories);
            });
        }
    
        // Apply filters based on request parameters
        if ($request->has('search')) {
            $searchTerms = explode(',', $request->input('search'));
    
            foreach ($searchTerms as $term) {
                $term = trim($term);
    
                $query->where(function ($innerQuery) use ($term, $request) {
                    $innerQuery->where('title', 'like', '%' . $term . '%')
                        ->orWhere(function ($titleOrCategoryQuery) use ($term, $request) {
                            // Get the fields to search from the request, default to ['name']
                            $searchFields = $request->input('search_fields', ['name']);
    
                            // Check if 'category' is in the fields to search, then apply the filter
                            if (in_array('category', $searchFields)) {
                                $titleOrCategoryQuery->orWhereHas('category', function ($categoryQuery) use ($term) {
                                    $categoryQuery->where('name', $term);
                                });
                            }
                        });
                });
            }
        }
    
        if ($request->has('order') && $request->input('order') === 'desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->orderBy('price', 'asc'); // Default to ascending order if 'order' is not provided or has a value other than 'desc'
        }
    
        // Retrieve the products
        $products = $query->with('category', 'magazins', 'subcategorie')->get();
    
        // Transform the data as needed
        $transformedProducts = $products->map(function ($product) {
            return [
                'image' => $product->image_url,
                'title' => $product->title,
                'id' => $product->id,
                'price' => $product->price,
                'category_name' => optional($product->category)->name,
                'magazin_name' => optional($product->magazins)->name,
                'description' => $product->description, // Add description to the transformed data
            ];
        });
    
        return response()->json($transformedProducts, 200);
    }
    





public function store(Request $request)
{
    // Validate the request data
    $validatedData = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'magazin_id' => 'required|exists:magazins,id',
        'category_id' => 'required|exists:categories,id',
        'subcategory_id' => 'required|exists:subcategories,id',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:6048',
    ]);

 
    

    // Handle image upload
    if ($request->hasFile('image')) {
        $uploadedImage = $request->file('image');
        $imagePath = $uploadedImage->store('images/products'); // You can customize the storage path

        // Save the image path in the database
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

