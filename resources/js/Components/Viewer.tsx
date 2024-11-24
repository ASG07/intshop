import React from 'react';
import React360Viewer from 'react-360-view';

interface Props {
    imageCount: number;
    imagePath: string;
}

const ProductViewer: React.FC<Props> = ({ imageCount, imagePath }) => {
    return (
        <div className='relative'>
            <React360Viewer
                amount={imageCount}
                imagePath={imagePath}
                fileName="image{index}.jpg"
                autoplay={false}
                zoom={false}
                loop={true}
                initialIndex={1}
                indexZeroBase={false}
                //buttonClass="hidden" // Hide default buttons if not needed
                style={{ width: '800px', height: '400px' }} // Adjust as needed
            />
        </div>
    );
};

export default ProductViewer;