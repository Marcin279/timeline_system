<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Routing dla Event Controller
Route::get('events', [EventController::class, 'index']);
Route::post('events', [EventController::class, 'store']);
Route::get('events/{id}', [EventController::class, 'show']);
Route::put('events/{id}', [EventController::class, 'update']);
Route::delete('events/{id}', [EventController::class, 'destroy']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/test', function () {
    return response()->json(['message' => 'Server is up!']);
});
