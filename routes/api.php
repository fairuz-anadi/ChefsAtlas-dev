<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('recipes', [RecipeController::class, 'index']);
Route::get('recipes/{id}', [RecipeController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('recipes', [RecipeController::class, 'store']);
    Route::put('recipes/{id}', [RecipeController::class, 'update']);
    Route::patch('recipes/{id}', [RecipeController::class, 'patch']);
    Route::delete('recipes/{id}', [RecipeController::class, 'destroy']);
});

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/logout',   [AuthController::class, 'logout'])->middleware('auth:sanctum');