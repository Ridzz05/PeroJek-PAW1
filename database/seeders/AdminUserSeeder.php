<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = trim((string) config('admin.user.email'));
        $password = (string) config('admin.user.password');

        if ($email === '' || $password === '') {
            $this->command?->warn('Admin user seed skipped: ADMIN_USER_EMAIL and ADMIN_USER_PASSWORD must be set.');

            return;
        }

        User::updateOrCreate(
            ['email' => strtolower($email)],
            [
                'name' => trim((string) config('admin.user.name')) ?: 'Administrator',
                'password' => Hash::make($password),
                'role' => trim((string) config('admin.user.role')) ?: 'admin',
            ],
        );
    }
}
