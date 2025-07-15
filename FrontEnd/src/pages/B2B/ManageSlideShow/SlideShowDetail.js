import React from 'react';
import { useParams } from 'react-router-dom';
import { ManageSlideshowProvider } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import SlideShowDetailLayout from '~/features/B2B/ManageSlideShow/SlideShow/SlideShowDetailLayout';

const SlideShowDetail = () => {
    const { slideShowId } = useParams();
    return (
        <ManageSlideshowProvider>
            <SlideShowDetailLayout slideShowId={slideShowId} />
        </ManageSlideshowProvider>
    );
};

export default SlideShowDetail; 