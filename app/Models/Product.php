<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'stock', 'image_path'];

    /**
     * Check stock availability
     */
    public function isAvailable($quantity)
    {
        return $this->stock >= $quantity;
    }
}
