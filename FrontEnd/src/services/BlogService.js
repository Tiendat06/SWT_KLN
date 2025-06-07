import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const blogRoute = 'api/Blog';

const getBlogByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${blogRoute}/${id}`,
    });
}

const getBlogListService = async (fetch, page, type = MediaType.None, keyword = "") => {
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