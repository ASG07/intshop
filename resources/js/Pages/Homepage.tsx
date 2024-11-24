import GuestLayout from "@/Layouts/GuestLayout";
import { Product } from "@/types";
import React from "react";
import { Link } from "@inertiajs/react";
import React360Viewer from 'react-360-view';

interface PageProps {
    products: Product[];
    imageCount: number;
    imagePath: string;
}
const Homepage: React.FC<PageProps> = ({ products, imageCount, imagePath }) => {
    console.log(products);
    return (
        <GuestLayout>
            <div className="font-sans">
                {/* Hero Section */}
                <section className="bg-[url('/images/living-room.webp')] bg-cover bg-center h-[80dvh] flex items-center justify-center">
                    <div className="bg-white bg-opacity-70 p-8 text-center rounded-md shadow-md">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Stylish Furniture for Every Home</h2>
                        <p className="text-gray-600 mb-6">Discover your dream furniture with unmatched quality and comfort.</p>
                        <Link href="/products" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Shop Now</Link>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="container mx-auto px-6 py-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="category-card">
                            <img src="/images/chair.png" alt="Sofas" className="rounded-md" />
                            <h3 className="mt-4 text-lg font-semibold text-gray-700">Sofas</h3>
                        </div>
                        <div className="category-card">
                            <img src="/images/sofa.jpg" alt="Chairs" className="rounded-md" />
                            <h3 className="mt-4 text-lg font-semibold text-gray-700">Chairs</h3>
                        </div>
                        <div className="category-card">
                            <img src="/images/table.png" alt="Tables" className="rounded-md" />
                            <h3 className="mt-4 text-lg font-semibold text-gray-700">Tables</h3>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="bg-gray-100 py-12">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
                        <div className="grid grid-cols-4 gap-6">
                            {products.map((product) => (
                                <Link href={`/products/${product.id}`} key={product.id} className="bg-white p-6 rounded-lg shadow-md">

                                    <img src={`images/products/${product.id}/360/image1.jpg`} alt="Product" className="rounded-md mb-4" />

                                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600">{product.price} SAR</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                {/* <section className="container mx-auto px-6 py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-gray-600 mb-6">Get the latest updates on new arrivals and exclusive deals.</p>
                    <div className="flex justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-1/3 px-4 py-2 border border-gray-300 rounded-l-md focus:ring focus:ring-blue-200"
                        />
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">Subscribe</button>
                    </div>
                </section> */}

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-6">
                    <div className="container mx-auto text-center">
                        <p>© 2024 IntShop</p>
                    </div>
                </footer>
            </div>
        </GuestLayout>
    );
};

export default Homepage;
