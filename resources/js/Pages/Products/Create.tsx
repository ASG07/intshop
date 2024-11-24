import { Link, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, ProductInfo } from "@/types";
import InputLabel from "@/Components/InputLabel";
import DangerButton from "@/Components/DangerButton";
import CustomCKEditor from '@/Components/CKEditor';
import SelectInput from "@/Components/SelectInput";
import ProductImagesUpload from "@/Components/ProductImagesUpload";
// import { React360Viewer } from 'react-360-view';


interface Props {

}

const Edit: React.FC<Props> = ({ }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: 0,
        // image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <GuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Story</h2>}
        >
            <Head title="Edit Product" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <form onSubmit={submit} className='p-6'>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                // required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="price" value="Price (SAR)" />
                                <TextInput
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={data.price}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("price", parseFloat(e.target.value))}
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <h2 className="text-xl">Description Preview:</h2>
                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: data.description }}
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel className="block text-sm font-medium mb-2" htmlFor="description" value="Description" />
                                <CustomCKEditor value={data.description} setData={setData} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('products.index')}>
                                    <DangerButton className="ms-4" disabled={processing}>CANCEL</DangerButton>
                                </Link>

                                <PrimaryButton type="submit" className="ms-4" disabled={processing}>
                                    SAVE
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Edit;
