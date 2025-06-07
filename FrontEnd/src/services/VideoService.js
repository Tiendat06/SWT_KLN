import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const videoRoute = 'api/Video';
export const getVideoListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `${videoRoute}?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}`,
    })
}

export const getVideoByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${videoRoute}/${id}`,
    })
}

export const getTotalVideoService = async (type = MediaType.None) => {
    return await UseFetchAPI({
        api: `${videoRoute}/total?Type=${type}`,
    })
}