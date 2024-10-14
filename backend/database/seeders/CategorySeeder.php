<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $categories = [
            [
                'name' => 'Technology',
                'color' => '#FF5733',
                'icon' => '🖥️'
            ],
            [
                'name' => 'Health',
                'color' => '#33FF57',
                'icon' => '💊'
            ],
            [
                'name' => 'Finance',
                'color' => '#3357FF',
                'icon' => '💰'
            ],
            [
                'name' => 'Education',
                'color' => '#FF33A8',
                'icon' => '📚'
            ],
            [
                'name' => 'Travel',
                'color' => '#FFA833',
                'icon' => '✈️'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
