<?php

use App\Http\Controllers\MagazinController;
use App\Http\Controllers\ownerController;
use App\Models\Admin;
use App\Models\Owner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum', 'ability:buyer'])->prefix('buyer')->group(static function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});


Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(static function () {


    Route::apiResources([
        'owners' => ownerController::class,
    ]); 

    Route::get('/', function (Request $request) {
        return $request->user();
    });
});


Route::middleware(['auth:sanctum', 'ability:owner'])->prefix('owner')->group(static function () {
    Route::apiResource('magazins', MagazinController::class);


   
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});
Route::apiResource('magazins', MagazinController::class)->withoutMiddleware(['auth:sanctum', 'ability:owner']);


require __DIR__ . '/auth.php';
