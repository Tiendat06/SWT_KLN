import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

export const getMusicListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `api/Music?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}`,
    })
}