import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Cart } from '@/types';

interface PageProps {
    cart: Cart;
    total: number;
}
const CartIndex: React.FC<PageProps> = ({ cart, total }) => {
    // const { cart, total } = usePage<PageProps>().props;
    console.log(cart);

    const handleUpdate = (itemId: number, quantity: number) => {
        // Implement update logic using Inertia
        router.put(`/cart/${itemId}/update`, { quantity });
    };

    const handleRemove = (itemId: number) => {
        // Implement remove logic using Inertia
        router.delete(`/cart/${itemId}/remove`);
    };

    return (
        <GuestLayout>
            <Head title="Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-4">
                            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

                            {cart.items.length == 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2">Product</th>
                                            <th className="py-2">Price</th>
                                            <th className="py-2">Quantity</th>
                                            <th className="py-2">Total</th>
                                            <th className="py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.items.map(item => (
                                            <tr key={item.id} className="text-center">
                                                <td className="py-2">
                                                    {item.product.name}
                                                </td>
                                                <td className="py-2">${item.price.toFixed(2)}</td>
                                                <td className="py-2">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={e => handleUpdate(item.id, parseInt(e.target.value))}
                                                        className="w-16 border rounded p-1"
                                                    />
                                                </td>
                                                <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td>
                                                <td className="py-2">
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            <div className="mt-4 text-right">
                                <span className="text-xl font-semibold">
                                    Total: ${total.toFixed(2)}
                                </span>
                            </div>

                            <div className="mt-6">
                                <Link href="/orders/create" className="bg-green-500 text-white px-4 py-2 rounded">
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default CartIndex;