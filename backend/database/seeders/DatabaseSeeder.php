<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Event;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Tworzenie użytkowników
        User::factory()->count(10)->create();

        // Tworzenie kategorii
        Category::factory()->count(5)->create();

        // Tworzenie wydarzeń
        Event::factory()->count(20)->create();
    }
}
