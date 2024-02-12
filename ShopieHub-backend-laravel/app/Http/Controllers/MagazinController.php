<?php

namespace App\Http\Controllers;

use App\Models\magazin;
use Illuminate\Http\Request;

class MagazinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve magazins related to the authenticated owner
        $magazins = auth()->user()->magazins;

        return response()->json($magazins);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'adresse' => 'required',
            'Latitude' => 'required',
            'Longitude' => 'required',
            'owner_id' => 'required|exists:owners,id',
        ]);

        $magazin = magazin::create($request->all());

        return response()->json($magazin, 201);
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
