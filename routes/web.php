<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AiChatController;

Route::prefix('api')->group(function () {

    // --- Public routes (no auth required) ---
    // Authentication
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    // Public: vehicle & category list for landing page
    Route::get('vehicles', [VehicleController::class, 'index']);
    Route::get('categories', [CategoryController::class, 'index']);

    // --- Protected routes (must be logged in) ---
    Route::middleware('auth')->group(function () {
        // Profile update
        Route::put('me', [AuthController::class, 'updateProfile']);

        // Dashboard stats
        Route::get('dashboard/stats', [DashboardController::class, 'getStats']);

        // AI assistant
        Route::post('ai-chat', [AiChatController::class, 'chat']);

        // Categories CRUD (write operations only; read is public above)
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);

        // Vehicles CRUD (write operations; read is public above)
        Route::apiResource('vehicles', VehicleController::class)->except(['index', 'show']);
        Route::patch('vehicles/{vehicle}/status', [VehicleController::class, 'updateStatus']);

        // Customers CRUD
        Route::apiResource('customers', CustomerController::class)->except(['show']);

        // Rentals / Bookings
        Route::get('rentals', [RentalController::class, 'index']);
        Route::post('rentals/book', [RentalController::class, 'book']);
        Route::post('rentals/{id}/return', [RentalController::class, 'returnVehicle']);
    });
});

// 2. SPA Fallback Route
Route::fallback(function () {
    return view('app');
});
