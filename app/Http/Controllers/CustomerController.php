<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CustomerController extends Controller
{
    public function index(): JsonResponse
    {
        $customers = Customer::orderBy('name', 'asc')->get();
        return response()->json($customers);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'identity_number' => 'required|string|unique:customers,identity_number',
            'address' => 'nullable|string',
        ]);

        $customer = Customer::create($validated);
        return response()->json($customer, 201);
    }

    public function update(Request $request, Customer $customer): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'identity_number' => 'required|string|unique:customers,identity_number,' . $customer->id,
            'address' => 'nullable|string',
        ]);

        $customer->update($validated);
        return response()->json($customer);
    }

    public function show(Customer $customer): JsonResponse
    {
        return response()->json($customer);
    }

    public function destroy(Customer $customer): JsonResponse
    {
        // Cegah penghapusan pelanggan yang masih punya histori rental
        if ($customer->rentals()->exists()) {
            return response()->json([
                'message' => 'Cannot delete customer: they have associated rental history.',
            ], 422);
        }

        $customer->delete();
        return response()->json(['message' => 'Customer deleted successfully']);
    }
}
