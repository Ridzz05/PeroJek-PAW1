<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Rental;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function getStats(): JsonResponse
    {
        return response()->json([
            'total_revenue' => Rental::totalRecognizedRevenue(),
            'vehicles_on_road' => Vehicle::countByStatus('Rented'),
            'vehicles_available' => Vehicle::countByStatus('Available'),
            'total_customers' => Customer::totalRegistered(),
            'upcoming_returns' => Rental::upcomingReturns(),
            'category_distribution' => Category::vehicleDistribution(),
            'monthly_revenue' => Rental::monthlyRevenueSeries(),
            'generated_at' => now()->toISOString(),
        ]);
    }
}
