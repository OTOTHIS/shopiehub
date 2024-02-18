<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\product>
 */
class productFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'description' => fake()->text(),
            'price' => fake()->numberBetween(100,600),
            'image' => fake()->imageUrl(),
            'category_id' => function () {
                return \App\Models\category::factory()->create()->id;
            },
            'magazin_id' => function () {
                return \App\Models\magazin::factory()->create()->id;
            },
            'subcategory_id' => function () {
                return \App\Models\Subcategory::factory()->create()->id;
            },
        ];
    }
}
