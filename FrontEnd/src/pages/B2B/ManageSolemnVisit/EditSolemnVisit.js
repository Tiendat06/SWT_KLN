import React from 'react';
import { EditSolemnVisitLayout } from '~/features/B2B/ManageSolemnVisit';
import { ManageSolemnVisitProvider } from '~/context/B2B/ManageSolemnVisit/ManageSolemnVisitContext';

const EditSolemnVisit = () => {
    return (
        <ManageSolemnVisitProvider>
            <EditSolemnVisitLayout />
        </ManageSolemnVisitProvider>
    );
};

export default EditSolemnVisit;


