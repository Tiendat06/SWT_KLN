import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

export const getBookListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `api/Book?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}`,
    });
}

export const getBookByIdService = async (bookId) => {
    return await UseFetchAPI({
        api: `api/Book/${bookId}`,
    })
}