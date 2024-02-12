<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Admin;
use App\Models\category;
use App\Models\magazin;
use App\Models\Owner;
use App\Models\product;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Owner::factory(10)->create();
        magazin::factory(10)->create();
        category::factory(20)->create();
        product::factory(20)->create();

        User::factory()->create([
            'name' => 'user',
            'email' => 'user@user.com',
            'password' => '123456789'
        ]);

        Admin::factory()->create([
            'firstname' => 'Admin',
            'lastname' => 'Admin',
            'cin' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(),10),
            'email' => 'admin@admin.admin',
            'password' => '$2y$10$ssjzkveLo5cC10ktCfJgvOtQcKsE0DuRmjijCBciikjPApZRyJHie'
        ]);

        Owner::factory()->create([
            'firstname' => 'Owner',
            'lastname' => 'Owner',
            'date_of_birth' => fake()->date(),
            'last_login_date' => fake()->date(),
            'cin' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(),10),
            'email' => 'Owner@Owner.Owner',
            'password' => '$2y$10$ssjzkveLo5cC10ktCfJgvOtQcKsE0DuRmjijCBciikjPApZRyJHie'
        ]);
    }
}
