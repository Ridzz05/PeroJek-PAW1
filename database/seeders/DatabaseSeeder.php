<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default User (for potential future login or admin user)
        User::query()->firstOrCreate(
            ['email' => 'admin@rental.com'],
            [
                'name' => 'Admin Rental',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ],
        );
        // BUAT KATEGORI KENDARAAN
        Category::query()->firstOrCreate(
            ['name' => 'MPV' , 'slug' => 'mpv', 'icon' => 'DirectionsBus'],
        );
        Category::query()->firstOrCreate(
            ['name' => 'SUV' , 'slug' => 'suv', 'icon' => 'DirectionsCar'],
        );
        Category::query()->firstOrCreate(
            ['name' => 'Hatchback' , 'slug' => 'hatchback', 'icon' => 'DirectionsCar'],
        );
        Category::query()->firstOrCreate(
            ['name' => 'Coupe' , 'slug' => 'coupe', 'icon' => 'DirectionsCar'],
        );
        Category::query()->firstOrCreate(
            ['name' => 'Convertible' , 'slug' => 'convertible', 'icon' => 'DirectionsCar'],
        );
        Category::query()->firstOrCreate(
            ['name' => 'Pickup' , 'slug' => 'pickup', 'icon' => 'DirectionsCar'],
        );
        Category::query()->firstOrCreate(
            ['name' => 'Van' , 'slug' => 'van', 'icon' => 'DirectionsCar'],
        );
    }
}