import React from 'react';
import { ManageSlideshowProvider } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import SlideShowLayouts from '~/features/B2B/ManageSlideShow/SlideShow/SlideShowLayouts';

const ManageSlideShow = () => {
    return (
        <ManageSlideshowProvider>
            <SlideShowLayouts />
        </ManageSlideshowProvider>
    );
};

export default ManageSlideShow; 