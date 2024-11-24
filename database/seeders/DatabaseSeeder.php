<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // external seeder
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('test'),
        ])->assignRole('admin');

        User::factory()->create([
            'name' => 'user',
            'email' => 'user@test.com',
            'password' => bcrypt('test'),
        ])->assignRole('user');

        Product::factory(10)->create();
    }
}
