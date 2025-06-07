import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const magazineRoute = 'api/Magazine';
export const getMagazineListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `${magazineRoute}`,
        params: {
            Fetch: fetch,
            Page: page,
            Type: type,
            Keyword: keyword,
        }
    });
}

export const getMagazineByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${magazineRoute}/${id}`,
    })
}