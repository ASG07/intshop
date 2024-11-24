import { Link, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Corrected import
import { Head } from "@inertiajs/react";
import { PageProps, ProductInfo } from "@/types"; // Changed PostInfo to StoryInfo
import InputLabel from "@/Components/InputLabel";
import DangerButton from "@/Components/DangerButton";
import CustomCKEditor from '@/Components/CKEditor';
import SelectInput from "@/Components/SelectInput";
import ProductImagesUpload from "@/Components/ProductImagesUpload";
import { useState } from "react";
// import { React360Viewer } from 'react-360-view';


interface Props {
    productInfo: ProductInfo; // Changed from postInfo to storyInfo
}

const Edit: React.FC<Props> = ({ productInfo }) => { // Changed postInfo to storyInfo
    console.log(productInfo);
    const { data, setData, post, processing, errors } = useForm({
        name: productInfo.name, // Changed postInfo to storyInfo
        description: productInfo.description,
        price: productInfo.price,
        stock: productInfo.stock,
        // image: null,
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const toggleIsSuccess = () => {
        setIsSuccess(true);
    }


    // console.log(data.content);
    // console.log(data.image);

    // const submit: FormEventHandler = (e) => {
    //     e.preventDefault();

    //     // put(`/stories/${storyInfo.id}`); // Changed route
    //     post(route("stories.update", storyInfo.id)); // Changed route and postInfo to storyInfo
    //       console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // if (!isSuccess) {
        //     alert('Please upload images first');
        //     return;
        // }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('stock', data.stock.toString());
        // if (data.image) {
        //     formData.append('image', data.image);
        // }
        formData.append('_method', 'PUT'); // Include the _method field

        // Optional: Log FormData entries for debugging
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        post(`/products/${productInfo.id}`, { // Changed route
            data: formData,
            onError: (errors) => console.log(errors),
        });
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
                            <InputLabel htmlFor="stock" value="Stock Amount" />
                            <TextInput
                                id="stock"
                                name="stock"
                                type="number"
                                value={data.stock}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("stock", parseInt(e.target.value))}
                            />
                            <InputError message={errors.stock} className="mt-2" />
                        </div>

                        {/* <div className="mt-4">
                            <InputLabel htmlFor="story_image_path" value="Story Image" />
                            <TextInput
                                id="story_image_path"
                                name="image"
                                type='file'
                                className="mt-1 block w-full"
                                onChange={(e) => setData("image", e.target.files ? e.target.files[0] : null)}
                            />
                            <InputError message={errors.image} className="mt-2" />
                        </div> */}

                        
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
