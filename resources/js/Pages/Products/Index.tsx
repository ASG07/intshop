import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';

// Define the Product interface
interface Product {
    id: number;
    name: string;
    price: number;
}

interface Props {
    products: Product[];
};

const Index: React.FC<Props> = ({ products }) => {
    if (!products || products.length === 0) {
        return <div className="text-center text-gray-500">No cards to display</div>;
    }

    const user = usePage().props.auth.user;
    console.log(user?.roles);

    return (
        <GuestLayout>
            <Head title="Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {user?.roles.includes('admin') ?
                        <Link href="/products/create" className="">
                            <PrimaryButton className="m-5">Add New Product</PrimaryButton>
                        </Link>
                        :
                        ''
                        
                        }
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                // <Link href={route("products.show", product.id)}><div key={product.id} className="overflow-hidden">
                                //     <div className="p-0 place-items-center">
                                //         <img
                                //             src={`images/products/${product.id}/360/image1.jpg`}
                                //             alt={product.name}
                                //             className=" h-48 object-center"
                                //         />
                                //     </div>
                                //     <div>
                                //         <h3 className='text-violet-900'>{product.name}</h3>
                                //         <div className='flex flex-row justify-between'>
                                //             <p className="text-lg text-gray-800">{product.price} ريال</p>
                                //         </div>

                                //     </div>

                                // </div></Link>
                                <Link href={`/products/${product.id}`} key={product.id} className="bg-white p-6 rounded-lg shadow-md">

                                    <img src={`images/products/${product.id}/360/image1.jpg`} alt="Product" className="rounded-md mb-4" />

                                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600">{product.price} SAR</p>
                                </Link>
                            ))}
                        </div>
                        {/* <div className="grid grid-cols-4 gap-6">
                            {products.map((product) => (
                                <Link href={`/products/${product.id}`} key={product.id} className="bg-white p-6 rounded-lg shadow-md">

                                    <img src={`images/products/${product.id}/360/image1.jpg`} alt="Product" className="rounded-md mb-4" />

                                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600">{product.price} SAR</p>
                                </Link>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};
export default Index;