<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'session_id'];

    /**
     * Relationships
     */
    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Calculate the subtotal of the cart.
     */
    public function getSubtotalAttribute()
    {
        return $this->items->sum(function ($item) {
            return $item->quantity * $item->price;
        });
    }
}

