<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Show the user's cart.
     */
    public function index()
    {
        $cart = $this->getUserCart()->load('items.product');

        return Inertia::render('Cart/Index', [
            'cart' => $cart,
            'total' => $cart->getSubtotalAttribute(),
        ]);
    }

    // //get the amount of items in the cart
    // public function getCartCount()
    // {
    //     //dd(Auth::check());
    //     if (Auth::check()) {
    //         $cart = $this->getUserCart()->load('items.product');
    //         $count = $cart->items->count();
    //         return $count;
    //     }
    //     else{
    //         // dd(session()->get('cart.count', 0));
    //         // return session()->get('cart.count', 0);
    //         return Cart::firstOrCreate(['session_id' => session()->getId()]);
    //     }

    // }

    /**
     * Add an item to the cart.
     */
    public function addItem(Request $request)
    {
        $request->validate([
            'productId' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        //dd($request);
        
        $cart = $this->getUserCart();
        $product = Product::findOrFail($request->productId);

        // Check stock availability
        if (!$product->isAvailable($request->quantity)) {
            return back()->with('error', 'Not enough stock');
        }

        $item = $cart->items()->where('product_id', $request->productId)->first();
        if ($item) {
            // Update quantity if item already exists
            $item->update([
                'quantity' => $item->quantity + $request->quantity,
            ]);
        } else {
            // Add new item to cart
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => $product->price,
            ]);
        }

        return back()->with('success', 'Item added to cart');
    }

    /**
     * Update an item's quantity in the cart.
     */
    public function updateItem(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Check stock availability
        if (!$cartItem->product->isAvailable($request->quantity)) {
            return back()->with('error', 'Not enough stock');
        }

        $cartItem->update(['quantity' => $request->quantity]);
        return back()->with('success', 'Cart item updated');
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem(CartItem $cartItem)
    {
        $cartItem->delete();
        return back()->with('success', 'Item removed from cart');
    }

    /**
     * Get or create the user's cart.
     */
    private function getUserCart(): Cart
    {
        if (Auth::check()) {
            return Cart::firstOrCreate(['user_id' => Auth::id()]);
        }

        return Cart::firstOrCreate(['session_id' => session()->getId()]);
    }
}
