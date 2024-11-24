<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 1, 100),
            'stock' => fake()->randomNumber(),
            'image_path' => fake()->imageUrl(),
            'created_by' => User::factory(),
            'updated_by' => User::factory(),
        ];
    }
}
