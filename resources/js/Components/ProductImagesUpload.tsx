// src/Components/ProductImagesUpload.tsx
import React from 'react';
import { useForm } from '@inertiajs/react';

interface ProductImagesUploadProps {
    productId: number;
    toggleIsSuccess: () => void;
}

const ProductImagesUpload: React.FC<ProductImagesUploadProps> = ({ productId, toggleIsSuccess }) => {
    const { data, setData, post, progress, processing, errors, reset } = useForm({
        images: [] as File[],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('images', Array.from(e.target.files));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/products/${productId}/upload-images`, {
            forceFormData: true,
            onSuccess: () => {
                reset('images');
                toggleIsSuccess();
                alert('Images uploaded successfully.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2"
            />
            {errors.images && (
                <div className="text-red-500 mt-1">{errors.images}</div>
            )}
            <button
                type="submit"
                disabled={processing || data.images.length === 0}
                className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
                {processing ? 'Uploading...' : 'Upload Images'}
            </button>
            {progress && (
                <div className="mt-2">
                    Upload Progress: {progress.percentage}%
                </div>
            )}
        </form>
    );
};

export default ProductImagesUpload;
