<?php

namespace App\Http\Controllers;

use App\Models\magazin;
use Illuminate\Http\Request;

class MagazinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     // Retrieve magazins related to the authenticated owner
    //     $magazins = auth()->user()->magazins;

    //     return response()->json($magazins);
    // }

    public function index()
    {
        // Retrieve magazins related to the authenticated owner
        $magazins = auth()->user()->magazins;
     
        // Append asset URL to each image path
        $magazins->transform(function ($magazin) {
            // Remove "images/" from the image path stored in the database
            $imagePathWithoutImages = str_replace('images/', '', $magazin->image);
            
            // Adjust the image URL based on the modified path
            $magazin->image_url = asset("storage/{$imagePathWithoutImages}");
            
            return $magazin;
        });
    
        return response()->json($magazins);
    }

    public function getMagazinDetail()
    {
       
      try {
        $magazins = magazin::all();
        // Append asset URL to each image path
        $magazins->transform(function ($magazin) {
            // Remove "images/" from the image path stored in the database
            $imagePathWithoutImages = str_replace('images/', '', $magazin->image);
            
            // Adjust the image URL based on the modified path
            $magazin->image_url = asset("storage/{$imagePathWithoutImages}");
            
            return $magazin;
        });
    
        return response()->json($magazins);
      } catch (\Throwable $th) {
        return response()->json(['error' => 'Magazins not founds.'], 404);
      }
    }
    
    public function getMagazin($id)
    {
        try {
            // Find the magazin by ID
            $magazin = Magazin::findOrFail($id);

            $imagePathWithoutImages = str_replace('images/', '', $magazin->image);
            $magazin->image_url = asset("storage/{$imagePathWithoutImages}");
    
            return response()->json($magazin);
        } catch (\Exception $e) {
            // Handle the case where magazin with the given ID is not found
            return response()->json(['error' => 'Magazin not found.'], 404);
        }
    }


    
    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required',
    //         'adresse' => 'required',
    //         'Latitude' => 'required',
    //         'Longitude' => 'required',
    //         'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust file type and size as needed
    //     ]);
    
    //     if ($request->hasFile('image')) {
    //         $uploadedImage = $request->file('image');
    //         $imagePath = $uploadedImage->store('images/magazins'); // You can customize the storage path
    
    //         // You may also want to save the image path in the database
    //         $imageName = basename($imagePath);
    //     }
    
    //     $magazin = new Magazin([
    //         'name' => $request->input('name'),
    //         'adresse' => $request->input('adresse'),
    //         'Latitude' => $request->input('Latitude'),
    //         'Longitude' => $request->input('Longitude'),
    //         'owner_id' => auth()->user()->id,
    //         'image' => $imageName ?? null, // Save the image name in the database
    //     ]);
    
    //     $magazin->save();
    
    //     return response()->json($magazin, 201);
    // }
    
    public function store(Request $request)
{
    // Validate the request data
    $validatedData = $request->validate([
        'name' => 'required|string',
        'Latitude' => 'required|string',
        'Longitude' => 'required|string',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:6048', // Image validation rules
    ]);

    // Handle image upload
    if ($request->hasFile('image')) {
        $uploadedImage = $request->file('image');
        $imagePath = $uploadedImage->store('images/magazins'); // You can customize the storage path

        // Save the image path in the database
        $validatedData['image'] = $imagePath;
        $magazin = new Magazin([
            'name' => $request->input('name'),
            'adresse' => $request->input('adresse'),
            'Latitude' => $request->input('Latitude'),
            'Longitude' => $request->input('Longitude'),
            'owner_id' => auth()->user()->id,
            'image' => $imagePath, // Save the image name in the database
        ]);
        $magazin->save();
        return response()->json($magazin, 201);
    }

    // Create a new product using Eloquent
  

    // Return a response, e.g., the newly created product
   
}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // $magazin = magazin::findOrFail($id);
        // return response()->json($magazin);

     

        try {
            $magazin = auth()->user()->magazins()->findOrFail($id);
            return response()->json($magazin);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Magazin not found'], 404);
        }

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'adresse' => 'required',
            'Latitude' => 'required',
            'Longitude' => 'required',
            'owner_id' => 'required|exists:owners,id',
        ]);

        $magazin = magazin  ::findOrFail($id);
        $magazin->update($request->all());

        return response()->json($magazin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // $magazin = magazin::findOrFail($id);
        // $magazin->delete();

        // return response()->json(null, 204);
    }
}
