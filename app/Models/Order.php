<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'subtotal', 'tax', 'total', 
        'payment_status', 'order_status', 'shipping_address'
    ];

    /**
     * Relationships
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Calculate the tax dynamically if needed.
     */
    public function calculateTax($rate = 0.15)
    {
        return $this->subtotal * $rate;
    }
}
