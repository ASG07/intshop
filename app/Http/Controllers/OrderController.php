<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Show the user's orders.
     */
    public function index(): Response
    {
        $orders = Order::where('user_id', Auth::id())
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    //get all orders
    public function allOrders()
    {
        $orders = Order::with('items.product')
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Orders/AllOrders', [
            'orders' => $orders,
        ]);
    }

    //cancel order
    public function cancelOrder(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.allOrders')->with('success', 'Order cancelled successfully!');
    }

    //change order status
    public function changeOrderStatus(Request $request, Order $order)
    {
        $request->validate([
            'order_status' => 'required|string|max:255',
        ]);

        $order->update([
            'order_status' => $request->input('order_status'),
        ]);

        return redirect()->back()->with('success', 'Order status updated successfully!');
    }

    /**
     * Show the order creation form.
     */
    public function create(): Response
    {
        $cart = $this->getUserCart()->load('items.product');

        if ($cart->items->isEmpty()) {
            return back()->with('error', 'Your cart is empty.');
        }

        return Inertia::render('Orders/Create', [
            'cart' => $cart,
        ]);
    }

    /**
     * Create a new order from the cart.
     */
    public function store(Request $request)
    {
        $cart = $this->getUserCart()->load('items.product');

        if ($cart->items->isEmpty()) {
            return back()->with('error', 'Cart is empty');
        }

        // Validate the shipping address
        $request->validate([
            'shipping_address' => 'required|string|max:255',
        ]);

        // Create the order
        $order = Order::create([
            'user_id' => Auth::id(),
            'subtotal' => $cart->subtotal,
            'tax' => $cart->subtotal * 0.15, // Assuming a 15% tax rate
            'total' => $cart->subtotal * 1.15,
            'payment_status' => 'pending',
            'order_status' => 'processing',
            'shipping_address' => $request->input('shipping_address'),
        ]);

        // Add items to the order
        foreach ($cart->items as $cartItem) {
            $order->items()->create([
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->price,
            ]);
        }

        // Clear the cart
        $cart->items()->delete();

        return redirect()->route('orders.index')->with('success', 'Order created successfully!');
    }

    /**
     * Get or create the user's cart (shared with CartController).
     */
    private function getUserCart()
    {
        if (Auth::check()) {
            return Cart::firstOrCreate(['user_id' => Auth::id()]);
        }

        return Cart::firstOrCreate(['session_id' => session()->getId()]);
    }
}
