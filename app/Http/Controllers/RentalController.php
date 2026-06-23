<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class RentalController extends Controller
{
    public function index(): JsonResponse
    {
        $rentals = Rental::with(['vehicle.category', 'customer'])
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($rentals);
    }

    public function book(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'customer_id' => 'required|exists:customers,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'payment_method' => 'required|in:Cash,QRIS,Card',
        ]);

        $vehicle = Vehicle::findOrFail($validated['vehicle_id']);

        if ($vehicle->status !== 'Available') {
            return response()->json([
                'message' => 'The selected vehicle is currently not available for rent.'
            ], 422);
        }

        // Calculate rental duration and costs
        $start = Carbon::parse($validated['start_date']);
        $end = Carbon::parse($validated['end_date']);
        $days = $start->diffInDays($end);
        if ($days === 0) {
            $days = 1; // Minimum 1 day rental
        }

        $totalAmount = $days * $vehicle->daily_rate;

        // Generate unique rental code
        $dateStr = Carbon::today()->format('Ymd');
        $latestRental = Rental::whereDate('created_at', Carbon::today())->latest('id')->first();
        $sequence = $latestRental ? ((int) substr($latestRental->rental_code, -4)) + 1 : 1;
        $rentalCode = 'TRX-' . $dateStr . '-' . str_pad($sequence, 4, '0', STR_PAD_LEFT);

        DB::beginTransaction();
        try {
            // Create rental record
            $rental = Rental::create([
                'rental_code' => $rentalCode,
                'vehicle_id' => $validated['vehicle_id'],
                'customer_id' => $validated['customer_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'total_days' => $days,
                'total_amount' => $totalAmount,
                'status' => 'Ongoing',
                'payment_method' => $validated['payment_method'],
            ]);

            // Update vehicle status
            $vehicle->update(['status' => 'Rented']);

            DB::commit();

            return response()->json($rental->load(['vehicle.category', 'customer']), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to process booking transaction: ' . $e->getMessage()
            ], 500);
        }
    }

    public function returnVehicle(Request $request, $id): JsonResponse
    {
        $rental = Rental::findOrFail($id);

        if ($rental->status !== 'Ongoing') {
            return response()->json([
                'message' => 'This rental transaction is already closed or cancelled.',
            ], 422);
        }

        // -------------------------------------------------------
        // Sistem Denda Otomatis (Late Return Penalty)
        // -------------------------------------------------------
        $today      = Carbon::today();
        $expectedEnd = Carbon::parse($rental->end_date)->startOfDay();

        // Hitung hari keterlambatan (0 jika tepat waktu atau lebih awal)
        $lateDays = max(0, $expectedEnd->diffInDays($today, false));

        // Denda: 10% dari daily_rate per hari keterlambatan
        $dailyRate    = (float) $rental->vehicle->daily_rate;
        $penaltyRate  = 0.10;                                     // 10% per hari
        $penaltyPerDay = $dailyRate * $penaltyRate;
        $totalPenalty  = $lateDays * $penaltyPerDay;

        // Total tagihan akhir = biaya sewa asal + denda
        $finalAmount = (float) $rental->total_amount + $totalPenalty;

        DB::beginTransaction();
        try {
            // Update rental: status Completed, simpan denda dan total akhir
            $rental->update([
                'status'        => 'Completed',
                'late_days'     => $lateDays,
                'penalty_amount' => $totalPenalty,
                'final_amount'  => $finalAmount,
            ]);

            // Kembalikan status kendaraan menjadi Available
            $vehicle = Vehicle::findOrFail($rental->vehicle_id);
            $vehicle->update(['status' => 'Available']);

            DB::commit();

            $response = $rental->load(['vehicle.category', 'customer']);

            return response()->json([
                'rental'         => $response,
                'late_days'      => $lateDays,
                'penalty_amount' => $totalPenalty,
                'final_amount'   => $finalAmount,
                'message'        => $lateDays > 0
                    ? "Kendaraan dikembalikan {$lateDays} hari terlambat. Denda: Rp " . number_format($totalPenalty, 0, ',', '.')
                    : 'Kendaraan dikembalikan tepat waktu.',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to process vehicle return: ' . $e->getMessage(),
            ], 500);
        }
    }
}
