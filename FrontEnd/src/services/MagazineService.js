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

export const magazineService = {
    getMagazineListService,
    getMagazineByIdService,
}