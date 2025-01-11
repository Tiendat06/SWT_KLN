import UseFetchAPI from "~/hooks/UseFetchAPI";
import {book_home_1} from "~/assets/img";

export const getTestData = (count) => {
    const {data} = UseFetchAPI('api/User/v1', {
        dependency: [count]
    });
    return data;
}

export const getBookListDataTop3 = () => {
    return [
        {bookId: '1', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: book_home_1, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {bookId: '2', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: book_home_1, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {bookId: '3', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: book_home_1, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
    ]
}