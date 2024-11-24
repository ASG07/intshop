import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import React360Viewer from 'react-360-view';
import CardList from '@/Components/cardList';
import ProductImagesUpload from '@/Components/ProductImagesUpload';
import { useState } from 'react';
import { Product, ProductInfo } from '@/types';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import Viewer from '@/Components/Viewer';


interface Props {
    products: Product[];
    product: ProductInfo;
    imageCount: number;
    imagePath: string;
};

const Show: React.FC<Props> = ({ products, product, imageCount, imagePath }) => {
    const { data, setData, post, processing, errors } = useForm({
        productId: product.id,
        quantity: 1, // default quantity
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const user = usePage().props.auth.user;
    console.log(product);

    const toggleIsSuccess = () => {
        setIsSuccess(!isSuccess);
    }

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('cart.add'), {
            onSuccess: () => {
                console.log('Item added to cart successfully!');
            },
            onError: () => {
                console.error('Failed to add item to cart', errors);
            },
        });
    };

    const deleteProduct = (product: ProductInfo) => {
        if (!window.confirm("Are you sure you want to delete the product?")) {
            return;
        }
        router.delete(route("products.destroy", product.id));
    };

    let date = new Date(product.created_at);
    return (
        <GuestLayout>
            <Head title="Product" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className='flex flex-col bbg-orange-500'>
                            <div className='flex flex-col md:flex-row md:h-[30rem] gap-3 bbg-amber-400 w-5/6 max-w-screen-lg mx-auto mt-5 md:mt-11'>
                                <div className='flex flex-col md:flex-row gap-2'>


                                    <div className='w-[25vh] md:w-[20rem] lg:w-[25rem] max-h-[25rem] md:max-h-full md:h-full bbg-lime-300 flex md:justify-center'>

                                        {/* <div className='w-36 container'> */}
                                        {/* <div style={{width:'40%'}}> */}
                                        {/* <React360Viewer
                                            amount={imageCount}
                                            imagePath={imagePath}
                                            fileName="image{index}.jpg"
                                            autoplay={true}
                                            zoom={false}
                                            loop={true}
                                            initialIndex={1}
                                            indexZeroBase={false}
                                            //buttonClass="hidden" // Hide default buttons if not needed
                                            style={{ width: '800px', height: '400px' }} // Adjust as needed
                                        /> */}
                                        <Viewer imageCount={imageCount} imagePath={imagePath}></Viewer>
                                        {/* </div> */}

                                    </div>
                                </div>

                                <div className='flex flex-col justify-between h-[28rem] md:h-full md:max-w-[20rem] bbg-cyan-300'>
                                    <div>
                                        <h1 className='text-3xl font-serif'>{product.name}</h1>
                                        <div className='flex flex-row gap-5 mt-1 text-slate-500'>
                                            <p>{date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()}</p>
                                        </div>
                                        <h2 className='text-2xl mt-4 text-gray-800'>{product.price} SAR
                                            {data.quantity > 1 && <span className=' text-base ms-3'>x{data.quantity} = {(product.price * data.quantity).toFixed(2)}</span>}</h2>
                                        {/* <span className='text-2xl mt-1'>{product.price} SAR</span> */}

                                        {/* <div>{product.createdBy}</div> */}
                                        {user?.roles.includes('admin') ?
                                            <div>
                                                <SecondaryButton className=' me-2'><Link href={`/products/${product.id}/edit`}>Edit</Link></SecondaryButton>
                                                <DangerButton onClick={() => deleteProduct(product)}>Delete</DangerButton>
                                            </div>
                                            : ''
                                        }

                                    </div>
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: product.description }}
                                    />
                                    <div>

                                        <form onSubmit={handleAddToCart} className='flex flex-row items-end gap-5'>
                                            <div>
                                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                                    Quantity
                                                </label>
                                                <input
                                                    type="number"
                                                    id='quantity'
                                                    min="1"
                                                    value={data.quantity}
                                                    onChange={(e) => setData('quantity', parseInt(e.target.value, 10))}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 h-[80%]"
                                            >
                                                {processing ? 'Adding...' : 'Add to Cart'}
                                            </button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                            <div className='bbg-red-600 w-5/6 max-w-screen-lg mx-auto mt-20'>
                                <div className="  flex flex-col">
                                    <div className="flex flex-row justify-between px-4">
                                        <h4>Other Products You May Like</h4>
                                        <button >
                                            <Link href="/products">See More...</Link>
                                        </button>
                                    </div>
                                    <div className="container mx-auto p-4">
                                        <CardList cards={products} />

                                        <CardList />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};
export default Show;