import React from 'react';
import { KLNBreadCrumb } from '~/components';
import { Link } from 'react-router-dom';
import AppRoutesEnum from '~/enum/Route/AppRoutesEnum';
import SlideShowTable from './SlideShowTable';

const SlideShowLayouts = () => {
    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-exhibition`}>Slideshow</Link> },
        { template: () => <span>Nhà trưng bày</span> }
    ];

    return (
        <>
            <h2 style={{ marginLeft: 15, fontWeight: 'bold' }}>Nhà trưng bày</h2>
            <KLNBreadCrumb items={items} />
            <SlideShowTable />
        </>
    );
};//

export default SlideShowLayouts; 