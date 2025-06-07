import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const musicRoute = "api/Music";
export const getMusicListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `${musicRoute}?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}`,
    })
}

export const getMusicByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${musicRoute}/${id}`,
    })
}

export const getTotalMusicService = async (type = MediaType.None) => {
    return await UseFetchAPI({
        api: `${musicRoute}/total?Type=${type}`,
    })
}