import UseFetchAPI from "~/hooks/UseFetchAPI";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const solemnVisitRoute = 'api/SolemnVisit';

const getSolemnVisitListService = async (fetch = DEFAULT_FETCH, page = DEFAULT_PAGE) => {
    return await UseFetchAPI({
        api: `${solemnVisitRoute}`,
        params: {
            fetch, 
            page
        }
    });
}

const getSolemnVisitByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${solemnVisitRoute}/${id}`,
        method: 'GET'
    });
}

const createSolemnVisitService = async (addedSolemnVisit, userId) => {
    const formData = new FormData();
    formData.append('name', addedSolemnVisit.name);
    formData.append('portraitImage', addedSolemnVisit.portraitImageFile);
    formData.append('letterImage', addedSolemnVisit.letterImageFile);
    formData.append('userId', userId);

    return await UseFetchAPI({
        api: `${solemnVisitRoute}`,
        method: 'POST',
        body: formData,
        headers: {}
    });
}

const updateSolemnVisitService = async (id, updatedSolemnVisit, userId) => {
    const formData = new FormData();
    formData.append('name', updatedSolemnVisit.name);
    if (updatedSolemnVisit.portraitImageFile) {
        formData.append('portraitImage', updatedSolemnVisit.portraitImageFile);
    }
    if (updatedSolemnVisit.letterImageFile) {
        formData.append('letterImage', updatedSolemnVisit.letterImageFile);
    }
    formData.append('userId', userId);

    return await UseFetchAPI({
        api: `${solemnVisitRoute}/${id}`,
        method: 'PUT',
        body: formData,
        headers: {}
    });
}

const deleteSolemnVisitService = async (ids) => {
    return await UseFetchAPI({
        api: `${solemnVisitRoute}/ids`,
        method: 'DELETE',
        params: { ids }
    });
}

export const solemnVisitService = {
    getSolemnVisitListService,
    getSolemnVisitByIdService,
    createSolemnVisitService,
    updateSolemnVisitService,
    deleteSolemnVisitService
};