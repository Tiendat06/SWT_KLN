import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const blogRoute = 'api/Blog';
export const getBlogByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${blogRoute}/${id}`,
    });
}

export const getBlogListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `${blogRoute}?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}`,
    })
}