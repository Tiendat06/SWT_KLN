import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

export const getBlogByIdService = async (id) => {
    return await UseFetchAPI({
        api: `api/Blog/${id}`,
    });
}

export const getBlogListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `api/Blog?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}`,
    })
}