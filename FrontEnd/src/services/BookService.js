import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const bookRoute = 'api/Book';
export const getBookListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `${bookRoute}?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}`,
    });
}

export const getBookByIdService = async (bookId) => {
    return await UseFetchAPI({
        api: `${bookRoute}/${bookId}`,
    })
}