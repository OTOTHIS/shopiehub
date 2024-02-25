<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MagazinController;
use App\Http\Controllers\ownerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SubcategoryController;
use App\Models\Admin;
use App\Models\Owner;
use App\Models\product;
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
Route::get('/getProductsForHomePage', [ProductController::class, 'getProductsForHomePage']);
Route::get('/getProductsForDetailsPage/{id}', [ProductController::class, 'getProductsForDetailsPage']);




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
    Route::apiResource('products', ProductController::class);
    Route::get('/producss', [ownerController::class, 'getProductsByMagazinAuth']);
    Route::get('/magazin/{magazinId}/products', [OwnerController::class, 'getProductsByOwnerAndMagazin']);
   // Route::apiResource('products', ProductController::class);
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});

Route::apiResource('magazins', MagazinController::class)->withoutMiddleware(['auth:sanctum', 'ability:owner']);
// Route::apiResource('categories', CategoryController::class)->withoutMiddleware(['auth:sanctum', 'ability:owner' , 'ability:admin','ability:buyer']);
// Route::apiResource('products', CategoryController::class)->withoutMiddleware(['auth:sanctum', 'ability:owner' , 'ability:admin','ability:buyer']);

Route::prefix('v1')->group(function () {
    Route::get('categories', [CategoryController::class, 'index'])->withoutMiddleware(['auth:sanctum', 'ability:owner', 'ability:admin', 'ability:buyer']);
    Route::get('categories/{category}', [CategoryController::class, 'show'])->withoutMiddleware(['auth:sanctum', 'ability:owner', 'ability:admin', 'ability:buyer']);

    Route::get('products', [ProductController::class, 'index'])->withoutMiddleware(['auth:sanctum', 'ability:owner', 'ability:admin', 'ability:buyer']);
    Route::get('products/{product}', [ProductController::class, 'show'])->withoutMiddleware(['auth:sanctum', 'ability:owner', 'ability:admin', 'ability:buyer']);
    Route::get('products/filter', [ProductController::class, 'getAllProductsWithFilters'])->withoutMiddleware(['auth:sanctum', 'ability:owner', 'ability:admin', 'ability:buyer']);

    
    Route::get('magazins', [MagazinController::class, 'getMagazinDetail'])->withoutMiddleware(['auth:sanctum', 'ability:owner', 'ability:admin', 'ability:buyer']);
    Route::get('magazins/{magazin}', [MagazinController::class, 'getMagazin'])->withoutMiddleware(['auth:sanctum', 'ability:owner', 'ability:admin', 'ability:buyer']);

    Route::get('subcategories/{subcategorie}', [SubcategoryController::class, 'getSubcategoriesByCategoryId'])->withoutMiddleware(['auth:sanctum', 'ability:owner', 'ability:admin', 'ability:buyer']);


});


require __DIR__ . '/auth.php';
