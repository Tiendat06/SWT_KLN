import React from 'react';
import { KLNBreadCrumb } from '~/components';
import SlideShowTable from './SlideShowTable';
import AppRoutesEnum from '~/enum/Route/AppRoutesEnum';

const SlideShowLayouts = () => {
    const items = [
        { template: () => <a href={`${AppRoutesEnum.AdminRoute}/manage-exhibition`}>Slideshow</a> },
        { template: () => <span>Nhà trưng bày</span> }
    ];
    return (
        <>
            <h2 style={{ marginLeft: 15, fontWeight: 'bold' }}>Nhà trưng bày</h2>
            <KLNBreadCrumb items={items} />
            <SlideShowTable />
        </>
    );
};

export default SlideShowLayouts; 