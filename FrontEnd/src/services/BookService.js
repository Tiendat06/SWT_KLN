import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const bookRoute = 'api/Book';

const getBookListService = async (fetch = DEFAULT_FETCH,
                                  page = DEFAULT_PAGE,
                                  type = MediaType.None,
                                  keyword = "") => {
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