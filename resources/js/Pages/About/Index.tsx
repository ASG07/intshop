import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

const AboutPage: React.FC = () => {
    return (
        <GuestLayout>
            <div className="font-sans">
                {/* Page Header */}
                <header className="bg-blue-600 py-12 text-center text-white">
                    <h1 className="text-4xl font-bold">About Us</h1>
                    <p className="mt-2">Learn more about who we are and what we do.</p>
                </header>

                {/* Company Overview */}
                <section className="container mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Our Story</h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto">
                        At <span className="font-bold text-blue-600">IntShop</span>, we believe that furniture transforms a house into a home.
                        Since our founding in 2010, we’ve been dedicated to offering beautifully crafted, high-quality furniture
                        that combines modern design with timeless craftsmanship. From cozy living spaces to elegant dining rooms,
                        we’re here to help you create a space that reflects your unique style.
                    </p>
                </section>

                {/* Mission, Vision, and Values */}
                <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-600">
                            To provide our customers with exceptional furniture that enhances their lifestyle while delivering
                            unparalleled customer service and value.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
                        <p className="text-gray-600">
                            To be the most trusted and innovative furniture brand, transforming living spaces worldwide with sustainable designs.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Values</h3>
                        <ul className="text-gray-600 list-disc list-inside">
                            <li>Quality and Craftsmanship</li>
                            <li>Customer Focus</li>
                            <li>Innovation and Creativity</li>
                            <li>Sustainability</li>
                            <li>Integrity and Respect</li>
                        </ul>
                    </div>
                </section>


                {/* Sustainability Section */}
                <section className="container mx-auto px-6 py-12 bg-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sustainability</h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto">
                        We care deeply about the planet and are committed to using sustainable materials and practices to reduce our environmental impact.
                        From responsibly sourced wood to eco-friendly packaging, we’re building a future where style and sustainability coexist.
                    </p>
                </section>
            </div>

        </GuestLayout>
    );
};

export default AboutPage;
