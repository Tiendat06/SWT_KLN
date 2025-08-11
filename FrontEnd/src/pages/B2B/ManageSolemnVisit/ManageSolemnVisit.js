import React from 'react';
import { SolemnVisitLayouts } from '~/features/B2B/ManageSolemnVisit';
import { ManageSolemnVisitProvider } from '~/context/B2B/ManageSolemnVisit/ManageSolemnVisitContext';

const ManageSolemnVisit = () => {
    return (
        <ManageSolemnVisitProvider>
            <SolemnVisitLayouts />
        </ManageSolemnVisitProvider>
    );
};

export default ManageSolemnVisit;


