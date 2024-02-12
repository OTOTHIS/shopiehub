<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreownerRequest;
use App\Http\Requests\UpdateownerRequest;
use App\Http\Resources\ownerResource;
use App\Models\Owner;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;

class ownerController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
      $data = OwnerResource::collection(Owner::all());
      return response()->json( $data, 200);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreownerRequest $request)
  {
    $formFields = $request->validated();
    $formFields['password'] = Hash::make($formFields['password']);
    $formFields['last_login_date'] = new \DateTime();
    $owners= Owner::create($formFields);

    return new ownerResource($owners);
  }

  public function showOwnerMagazins($ownerId)
  {
      // Find the owner by ID
      $owner = Owner::find($ownerId);

      if (!$owner) {
          return response()->json(['message' => 'Owner not found'], 404);
      }

      // Load the related Magazins
      $magazins = $owner->magazins;

      return response()->json(['owner' => $owner, 'magazins' => $magazins]);
  }
  /**
   * Display the specified resource.
   */
  public function show(Owner $owner)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateownerRequest $request, Owner $owner)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Owner $owner)
  {
    //
  }
}
