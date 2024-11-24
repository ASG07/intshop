<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ProductInfoResource;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Products/Index', [
            'products' => Product::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            //'stock' => 'required|integer',
            //'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::create($data);
        return inertia('Products/CreateImages', ['productInfo' => new ProductInfoResource($product)]);
    }


    public function uploadImages(Request $request, Product $product)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $productId = $product->id;
        $destinationPath = "images/products/{$productId}/360";

        // Delete existing images and recreate the directory
        if (Storage::disk('public')->exists($destinationPath)) {
            Storage::disk('public')->deleteDirectory($destinationPath);
            //dd('Deleted');
        }
        Storage::disk('public')->makeDirectory($destinationPath);

        $images = $request->file('images');

        // Create an instance of ImageManager with GD driver
        $imageManager = new ImageManager(new Driver());

        foreach ($images as $index => $image) {
            $extension = 'jpg'; // Standardize to JPG format
            // $sequenceNumber = str_pad($index + 1, 3, '0', STR_PAD_LEFT); // 001, 002, 003, ... format which React360Viewer does not support
            $sequenceNumber = $index + 1;
            $imageName = "image{$sequenceNumber}.{$extension}";
            $imagePath = storage_path("app/{$destinationPath}/{$imageName}");

            // Optimize and save the image
            $imageInstance = $imageManager->read($image->getRealPath())
                ->resize(width: 800, height: null)
                ->encodeByExtension('jpg', quality: 80);

            // Save the processed image using Laravel's Storage facade
            //Storage::put("{$destinationPath}/{$imageName}", (string)$imageInstance);
            Storage::disk('public')->put("images/products/{$productId}/360/{$imageName}", (string)$imageInstance);

        }

        return redirect()->back()->with('success', 'Images uploaded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        // return Inertia::render('Products/Show', ['product' => new ProductInfoResource($product)]);
        $productId = $product->id;
        $imageDirectory = storage_path("app/public/images/products/{$productId}/360");

        // Ensure the directory exists
        if (!file_exists($imageDirectory)) {
            $imageCount = 0;
        } else {
            // Get all image files in the directory
            $imageFiles = glob($imageDirectory . '/*.{jpg,png,jpeg,gif}', GLOB_BRACE);

            // Count the number of image files
            $imageCount = count($imageFiles);
        }

        return Inertia::render('Products/Show', [
            'products' => Product::all()->take(5),
            'product' => new ProductInfoResource($product),
            'imageCount' => $imageCount, // Number of images
            'imagePath' => "/storage/images/products/{$productId}/360",
        ]);
    }
    // 'imagePath' => "/images/products/{$product->id}/360/",
    // 'imagePath' => "storage/app/public/images/products/{$product->id}/360/",

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', ['productInfo' => new ProductInfoResource($product)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //dd($product->id);
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            //'category_id' => 'required|exists:categories,id',
        ]);

        $product->update($request->only(['name', 'description', 'price', 'stock']));

        return redirect()->route('products.show', $product)->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete the images folder associated with the product
        $productId = $product->id;
        $destinationPath = "images/products/{$productId}/360";

        if (Storage::disk('public')->exists($destinationPath)) {
            Storage::disk('public')->deleteDirectory($destinationPath);
        }

        // Delete the product
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
