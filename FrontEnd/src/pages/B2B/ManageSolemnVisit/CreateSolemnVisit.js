import React from 'react';
import { CreateSolemnVisitLayout } from '~/features/B2B/ManageSolemnVisit';
import { ManageSolemnVisitProvider } from '~/context/B2B/ManageSolemnVisit/ManageSolemnVisitContext';

const CreateSolemnVisit = () => {
    return (
        <ManageSolemnVisitProvider>
            <CreateSolemnVisitLayout />
        </ManageSolemnVisitProvider>
    );
};

export default CreateSolemnVisit;


