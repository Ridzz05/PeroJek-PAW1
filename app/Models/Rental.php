<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

#[Fillable([
    'rental_code',
    'vehicle_id',
    'customer_id',
    'start_date',
    'end_date',
    'total_days',
    'total_amount',
    'status',
    'payment_method',
])]
class Rental extends Model
{
    use HasFactory;

    public const REVENUE_STATUSES = ['Ongoing', 'Completed'];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'total_days' => 'integer',
            'total_amount' => 'decimal:2',
        ];
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function scopeRevenueEligible(Builder $query): Builder
    {
        return $query->whereIn('status', self::REVENUE_STATUSES);
    }

    public static function totalRecognizedRevenue(): float
    {
        return (float) static::query()
            ->revenueEligible()
            ->sum('total_amount');
    }

    public static function upcomingReturns(int $limit = 5): Collection
    {
        return static::query()
            ->with(['vehicle', 'customer'])
            ->where('status', 'Ongoing')
            ->orderBy('end_date', 'asc')
            ->take($limit)
            ->get();
    }

    public static function monthlyRevenueSeries(int $months = 6): array
    {
        $series = [];
        $monthCount = max(1, $months);

        for ($i = $monthCount - 1; $i >= 0; $i--) {
            $monthStart = Carbon::now()->subMonths($i)->startOfMonth();
            $monthEnd = (clone $monthStart)->endOfMonth();

            $series[] = [
                'month' => $monthStart->format('M'),
                'revenue' => (float) static::query()
                    ->revenueEligible()
                    ->whereBetween('created_at', [$monthStart, $monthEnd])
                    ->sum('total_amount'),
            ];
        }

        return $series;
    }
}
