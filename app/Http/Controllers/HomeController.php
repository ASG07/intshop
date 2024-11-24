<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductResource;

class HomeController extends Controller
{
    //homepage, which has four products in display
    public function index()
    {
        $products = Product::latest()->take(4)->get();
        return inertia('Homepage', [
            'products' => $products,
        ]);
    }

    //about page
    public function about()
    {
        return view('about');
    }

    //contact page
    public function contact()
    {
        return view('contact');
    }
}
