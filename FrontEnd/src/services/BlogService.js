import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const blogRoute = 'api/Blog';

const getBlogByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${blogRoute}/${id}`,
    });
}

const getBlogListService = async (fetch = DEFAULT_FETCH,
                                  page = DEFAULT_PAGE,
                                  type = MediaType.None,
                                  keyword = "") => {
    return await UseFetchAPI({
        api: `${blogRoute}`,
        params: {
            fetch, page, type, keyword,
        }
    })
}

export const blogService = {
    getBlogByIdService,
    getBlogListService,
}