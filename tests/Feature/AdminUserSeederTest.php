<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminUserSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_skips_admin_user_when_required_config_is_missing(): void
    {
        config()->set('admin.user.email', null);
        config()->set('admin.user.password', null);

        $this->seed(AdminUserSeeder::class);

        $this->assertDatabaseCount('users', 0);
    }

    public function test_it_creates_or_updates_one_admin_user_from_config(): void
    {
        config()->set('admin.user.name', 'Production Admin');
        config()->set('admin.user.email', 'Admin@Example.com');
        config()->set('admin.user.password', 'secret-password');
        config()->set('admin.user.role', 'admin');

        $this->seed(AdminUserSeeder::class);
        $this->seed(AdminUserSeeder::class);

        $this->assertSame(1, User::where('email', 'admin@example.com')->count());

        $user = User::where('email', 'admin@example.com')->firstOrFail();

        $this->assertSame('Production Admin', $user->name);
        $this->assertSame('admin', $user->role);
        $this->assertTrue(Hash::check('secret-password', $user->password));
    }
}
