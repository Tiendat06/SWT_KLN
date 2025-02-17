import {book_home_1, tac_pham_5} from "~/assets/img";
import UseFetchAPI from "~/hooks/UseFetchAPI";

export const getMasterPieceList = async (fetch, page) => {
    return await UseFetchAPI({
        api: `api/Book?Fetch=${fetch}&Page=${page}`,
    });
}

export const getHandiworkList = async (fetch, page) => {
    return await UseFetchAPI({
        api: `api/Magazine?Fetch=${fetch}&Page=${page}`,
    });
}

export const getBooksQuantity = async () => {
    return await UseFetchAPI({
        api: `api/Book/book-quan`,
    })
}

export const getBookList = async (fetch, page) => {
    return await UseFetchAPI({
        api: `api/Book?Fetch=${fetch}&Page=${page}`,
    })
}

export const getCreatureList = () => {
    return [
        {handiworkId: '1', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {handiworkId: '2', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {handiworkId: '3', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {handiworkId: '4', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {handiworkId: '5', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {handiworkId: '6', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {handiworkId: '7', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {handiworkId: '8', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {handiworkId: '9', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: tac_pham_5, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
    ];
}