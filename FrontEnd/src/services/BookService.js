import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const bookRoute = 'api/Book';

const getBookListService = async (fetch, page, type = MediaType.None, keyword = "") => {
    return await UseFetchAPI({
        api: `${bookRoute}`,
        params: {
            fetch, page, type, keyword,
        }
    });
}

const getBookByIdService = async (bookId) => {
    return await UseFetchAPI({
        api: `${bookRoute}/${bookId}`,
    })
}

export const bookService = {
    getBookListService,
    getBookByIdService,
}