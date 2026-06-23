<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tambah kolom sistem denda otomatis ke tabel rentals.
     * - late_days      : jumlah hari keterlambatan pengembalian
     * - penalty_amount : total denda (late_days * 10% * daily_rate)
     * - final_amount   : total tagihan akhir (total_amount + penalty_amount)
     */
    public function up(): void
    {
        Schema::table('rentals', function (Blueprint $table) {
            $table->unsignedInteger('late_days')->default(0)->after('payment_status');
            $table->decimal('penalty_amount', 12, 2)->default(0)->after('late_days');
            $table->decimal('final_amount', 12, 2)->nullable()->after('penalty_amount');
        });
    }

    public function down(): void
    {
        Schema::table('rentals', function (Blueprint $table) {
            $table->dropColumn(['late_days', 'penalty_amount', 'final_amount']);
        });
    }
};
