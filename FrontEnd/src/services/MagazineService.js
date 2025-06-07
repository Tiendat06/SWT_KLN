import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const magazineRoute = 'api/Magazine';

const getMagazineListService = async (fetch, page, type = MediaType.None, keyword = "") => {
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