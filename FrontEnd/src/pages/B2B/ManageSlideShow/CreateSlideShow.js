import React from 'react';
import { ManageSlideshowProvider } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import CreateSlideShowLayout from '~/features/B2B/ManageSlideShow/SlideShow/CreateSlideShowLayout';

const CreateSlideShow = () => {
    return (
        <ManageSlideshowProvider>
            <CreateSlideShowLayout />
        </ManageSlideshowProvider>
    );
};

export default CreateSlideShow; 