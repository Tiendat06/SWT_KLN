import React from 'react';
import { useParams } from 'react-router-dom';
import { ManageSlideshowProvider } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import EditSlideShowLayout from '~/features/B2B/ManageSlideShow/SlideShow/EditSlideShowLayout';

const EditSlideShow = () => {
    const { slideShowId } = useParams();
    return (
        <ManageSlideshowProvider>
            <EditSlideShowLayout slideShowId={slideShowId} />
        </ManageSlideshowProvider>
    );
};

export default EditSlideShow; 