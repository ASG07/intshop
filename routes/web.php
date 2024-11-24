<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\HomeController;
use App\Models\Product;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

//home page is the HomePage.tsx file in the Pages folder
// Route::get('/', function () {
//     return Inertia::render('Homepage');
// })->name('home');
Route::get('/', [HomeController::class, 'index'])->name('home');
// Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');



Route::get('/about', function () {
    return Inertia::render('About/Index');
})->name('about.index');

Route::get('/contact', function () {
    return Inertia::render('Contact/Index');
})->name('contact.index');



Route::post('/products/{product}/upload-images', [ProductController::class, 'uploadImages'])->name('products.uploadImages');
Route::post('/products/{product}', [ProductController::class, 'update'])->name('products.custom_update');
Route::resource('products', ProductController::class)->names('products');
//Route::resource('cart', CartController::class);

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'addItem'])->name('cart.add');
Route::put('/cart/{cartItem}/update', [CartController::class, 'updateItem'])->name('cart.update');
Route::delete('/cart/{cartItem}/remove', [CartController::class, 'removeItem'])->name('cart.remove');
// Route::get('/cart/count', [CartController::class, 'getCartCount'])->name('cart.count');

// Keep order-related routes protected by auth
Route::middleware('auth')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/all', [OrderController::class, 'allOrders'])->name('orders.allOrders');
    Route::put('/orders/{order}/status', [OrderController::class, 'changeOrderStatus'])->name('orders.changeStatus');
    Route::delete('/orders/{order}/cancel', [OrderController::class, 'cancelOrder'])->name('orders.cancel');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
