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
import { useState } from "react";
// import { React360Viewer } from 'react-360-view';
import { router } from '@inertiajs/react';

interface Props {
    productInfo: ProductInfo;
}

const Edit: React.FC<Props> = ({ productInfo }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: 0,
        // image: null,
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const toggleIsSuccess = () => {
        setIsSuccess(true);
    }

    const goToProductPage = () => {
        if (!isSuccess) {
            alert('Please upload images first');
            return;
        }

        //window.location.href = `/products/${productInfo.id}`;
    

        router.visit(`/products/${productInfo.id}`);
    };

    return (
        <GuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Story</h2>}
        >
            <Head title="Edit Product" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="mt-4 p-6">
                            <h2 className="text-xl">Upload 360 Images:</h2>
                            <ProductImagesUpload productId={productInfo.id} toggleIsSuccess={toggleIsSuccess} />
                            {isSuccess && (
                                <div className="mt-4 text-green-500">
                                    Images uploaded successfully!
                                </div>
                            )}
                        </div>

                            <PrimaryButton onClick={() => goToProductPage}>Save</PrimaryButton>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Edit;
