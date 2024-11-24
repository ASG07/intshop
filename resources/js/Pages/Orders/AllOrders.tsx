// resources/js/Pages/Orders/Index.tsx

import React from 'react';
import { usePage, Link, Head, router } from '@inertiajs/react';
import { Order, OrderStatus } from '@/types';
import dayjs from 'dayjs';
import GuestLayout from '@/Layouts/GuestLayout';

interface PageProps {
    orders: Order[];
}

const OrdersIndex: React.FC = () => {
    const { orders } = usePage<PageProps>().props;
    console.log(orders);

    return (
        <GuestLayout>
            <Head title="Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-4">
                            <h1 className="text-3xl font-bold mb-6">Orders</h1>

                            {orders.length === 0 ? (
                                <p>no orders yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.id} className="bg-white shadow rounded p-4">
                                            <div className='flex flex-row justify-between'>
                                                <p>Order By: <span className=' font-medium'>{order.user.name}</span></p>
                                                <p>Email: <span className=' font-medium'>{order.user.email}</span></p>
                                            </div>
                                            <hr />
                                            <div className="flex justify-between items-center mt-3">
                                                <div className=' min-w-80'>
                                                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                                                    <p className="text-gray-600">
                                                        Placed on {dayjs(order.created_at).format('MMMM D, YYYY')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span
                                                        // className={`px-3 py-1 rounded-full text-sm ${order.order_status === 'processing'
                                                        //     ? 'bg-yellow-100 text-yellow-800'
                                                        //     : order.order_status === 'completed'
                                                        //         ? 'bg-green-100 text-green-800'
                                                        //         : 'bg-red-100 text-red-800'
                                                        //     }`}
                                                    >
                                                        {/* {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)} */}
                                                        <select
                                                            value={order.order_status}
                                                            onChange={(e) => {
                                                                router.put(route('orders.changeStatus', order.id), { order_status: e.target.value });
                                                            }}
                                                            className="ml-2 bg-white border border-gray-300 rounded"
                                                        >
                                                            <option value="processing">Processing</option>
                                                            <option value="shipped">Shipped</option>
                                                            <option value="delivered">Delivered</option>
                                                            <option value="cancelled">Cancelled</option>
                                                            <option value="processing refund">Processing Refund</option>
                                                            <option value="refunded">Refunded</option>
                                                        </select>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <h3 className="font-semibold">Items:</h3>
                                                <ul className="list-disc list-inside">
                                                    {order.items.map(item => (
                                                        <li key={item.id}>
                                                            {item.quantity}x {item.product.name} @ {item.price.toFixed(2)} SAR
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className='mt-4 bg-white shadow rounded p-4'>
                                                <h4>Shipping Address:</h4>
                                                <p>{order.shipping_address}</p>
                                            </div>

                                            <div className="mt-4 flex justify-end">
                                                <span className="font-semibold">Total: {order.total.toFixed(2)} SAR</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-6">
                                <Link href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Back to Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default OrdersIndex;
