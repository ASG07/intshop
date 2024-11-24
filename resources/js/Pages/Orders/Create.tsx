import React, { useState } from 'react';
import { usePage, router, Head } from '@inertiajs/react';
import { Cart } from '@/types';
import GuestLayout from '@/Layouts/GuestLayout';

interface PageProps {
    cart: Cart;
}

const OrdersCreate: React.FC = () => {
    const { cart } = usePage<PageProps>().props;
    const [shippingAddress, setShippingAddress] = useState('');
    const [errors, setErrors] = useState<{ shipping_address?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post('/orders', { shipping_address: shippingAddress }, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const calculateSubtotal = () => {
        return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const calculateTax = (subtotal: number) => {
        return subtotal * 0.15; // 15% tax
    };

    const calculateTotal = (subtotal: number, tax: number) => {
        return subtotal + tax;
    };

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, tax);

    return (
        <GuestLayout>
            <Head title="Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-4">
                            <h1 className="text-3xl font-bold mb-6">Create Order</h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="shipping_address" className="block text-sm font-medium text-gray-700">
                                        Shipping Address
                                    </label>
                                    <textarea
                                        id="shipping_address"
                                        name="shipping_address"
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                        className={`mt-1 block w-full border ${errors.shipping_address ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                        rows={4}
                                        required
                                    ></textarea>
                                    {errors.shipping_address && (
                                        <p className="mt-2 text-sm text-red-600">{errors.shipping_address}</p>
                                    )}
                                </div>

                                <div className="bg-gray-100 p-4 rounded">
                                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>{subtotal.toFixed(2)} SAR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax VAT (15%):</span>
                                        <span>{tax.toFixed(2)} SAR</span>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span>{total.toFixed(2)} SAR</span>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6">
                                <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2">Product</th>
                                            <th className="py-2">Price</th>
                                            <th className="py-2">Quantity</th>
                                            <th className="py-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.items.map(item => (
                                            <tr key={item.id} className="text-center">
                                                <td className="py-2">{item.product.name}</td>
                                                <td className="py-2">{item.price.toFixed(2)} SAR</td>
                                                <td className="py-2">{item.quantity}</td>
                                                <td className="py-2">{(item.price * item.quantity).toFixed(2)} SAR</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default OrdersCreate;
