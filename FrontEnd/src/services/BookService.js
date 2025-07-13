import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";
import HttpMethodEnum from "~/enum/Http/HttpMethodEnum";

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

const addBookService = async (addedBook, mediaTypeId = MediaType.None) => {
    const formData = new FormData();
    formData.append("title", addedBook.title);
    formData.append("bookContent", addedBook.bookContent);
    formData.append("description", addedBook.description);
    formData.append("publisher", addedBook.publisher);
    formData.append("author", addedBook.author);
    formData.append("yearPublic", addedBook.yearPublic.getFullYear().toString());
    formData.append("mediaTypeId", mediaTypeId);
    formData.append("image", addedBook.imageFile);
    formData.append("userId", addedBook.userId);

    return await UseFetchAPI({
        api: `${bookRoute}`,
        headers: null,
        body: formData,
        method: HttpMethodEnum.POST,
    });
}

const deleteManyBookService = async (bookIds) => {
    return await UseFetchAPI({
        api: `${bookRoute}`,
        method: HttpMethodEnum.DELETE,
        body: JSON.stringify(bookIds),
    })
}

const updateBookService = async (id, updatedBook, mediaType = MediaType.None) => {
    const formData = new FormData();
    formData.append("title", updatedBook.title);
    formData.append("mediaTypeId", mediaType);
    formData.append("bookContent", updatedBook.bookContent);
    formData.append("description", updatedBook.description);
    formData.append("publisher", updatedBook.publisher);
    formData.append("author", updatedBook.author);
    formData.append("yearPublic", updatedBook.yearPublic.toString());
    formData.append("image", updatedBook.imageFile);
    formData.append("userId", updatedBook.userId);

    return await UseFetchAPI({
        api: `${bookRoute}/${id}`,
        method: HttpMethodEnum.PUT,
        body: formData,
        headers: null
    })
}

export const bookService = {
    getBookListService,
    getBookByIdService,
    addBookService,
    deleteManyBookService,
    updateBookService
}