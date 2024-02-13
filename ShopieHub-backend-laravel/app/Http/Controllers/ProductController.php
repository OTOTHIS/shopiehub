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
      

      $file_path = $product->image ;
    //   $img = "images/products/ypSqWRtx7EbHfNynnmgcpBu1jCtGz09altoCsQor.png" ;
    
        // If the image path exists, attempt to delete the corresponding image file
        if ( $file_path ) {
            try {

        // Delete the image
        if (Storage::disk('local')->exists($file_path)) {
            Storage::disk('local')->delete($file_path);
    $product->delete();
    // Image deleted successfully
} else {
    return response()->json(['message' => 'file not exist'],404);
}
        
            } catch (\Exception $e) {
                // Log or handle the exception as needed
                \Log::error("Error deleting image: {$e->getMessage()}");
            }
        }
    
        return response()->json(['message' => 'Product and associated image deleted successfully']);
    }






}

