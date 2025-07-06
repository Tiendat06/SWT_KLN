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

const addBookService = async (addedBook, mediaTypeId = MediaType.None) => {
    const formData = new FormData();
    formData.append("title", addedBook.title);
    formData.append("bookContent", addedBook.bookContent);
    formData.append("description", addedBook.description);
    formData.append("publisher", addedBook.publisher);
    formData.append("author", addedBook.author);
    formData.append("yearPublic", addedBook.yearPublic);
    formData.append("mediaTypeId", mediaTypeId);
    formData.append("image", addedBook.imageFile);
    formData.append("userId", addedBook.userId);

    return await UseFetchAPI({
        api: `${bookRoute}`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
        method: 'POST',
    });
}

const deleteManyBookService = async (bookIds) => {
    return await UseFetchAPI({
        api: `${bookRoute}`,
        method: 'DELETE',
        body: {
            ids: bookIds
        }
    })
}

export const bookService = {
    getBookListService,
    getBookByIdService,
    addBookService,
    deleteManyBookService
}