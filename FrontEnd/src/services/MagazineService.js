import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const magazineRoute = 'api/Magazine';

const getMagazineListService = async (fetch = DEFAULT_FETCH,
                                      page = DEFAULT_PAGE,
                                      type = MediaType.None,
                                      keyword = "") => {
    return await UseFetchAPI({
        api: `${magazineRoute}`,
        params: {
            fetch, page, type, keyword,
        }
    });
}

const getMagazineByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${magazineRoute}/${id}`,
    })
}

const addMagazineService = async (addedMagazine, mediaType = MediaType.None) => {
    const formData = new FormData();
    formData.append('title', addedMagazine.title);
    formData.append('mediaTypeId', mediaType);
    formData.append('image', addedMagazine.imageFile);
    formData.append('magazineContent', addedMagazine.magazineContent);
    formData.append('userId', addedMagazine.userId);

    return await UseFetchAPI({
        api: `${magazineRoute}`,
        body: formData,
        headers: null,
        method: "POST",
    })
}

const deleteManyMagazineService = async (magazineIds) => {
    return await UseFetchAPI({
        api: `${magazineRoute}`,
        method: 'DELETE',
        body: JSON.stringify(magazineIds)
    });
}

const updateMagazineService = async (id, updatedMagazine, mediaType = MediaType.None) => {
    const formData = new FormData();
    formData.append("title", updatedMagazine.title);
    formData.append("mediaTypeId", mediaType);
    formData.append("description", updatedMagazine.description);
    formData.append('image', updatedMagazine.imageFile);
    formData.append('magazineContent', updatedMagazine.magazineContent);
    formData.append('userId', updatedMagazine.userId);

    return await UseFetchAPI({
        api: `${magazineRoute}/${id}`,
        method: 'PUT',
        headers: null,
        body: formData
    });
}

export const magazineService = {
    getMagazineListService,
    getMagazineByIdService,
    addMagazineService,
    deleteManyMagazineService,
    updateMagazineService
}