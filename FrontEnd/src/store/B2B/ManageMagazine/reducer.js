import {
    ADD_BOOK,
    ADD_MAGAZINE, DELETE_BOOK,
    DELETE_MAGAZINE,
    GET_BOOK,
    GET_MAGAZINE, SET_BOOK, SET_MAGAZINE, UPDATE_BOOK,
    UPDATE_MAGAZINE
} from "~/store/B2B/ManageMagazine/constansts";

export const initialState = {
    magazine: {},
    magazineList: [],

    book: {},
    bookList: [],

    isUpdated: false,
}

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case GET_MAGAZINE:
            newState = {
                ...state,
                magazineList: [...action.payLoad],
            }
            break;
        case SET_MAGAZINE:
            newState = {
                ...state,
                magazine: action.payLoad,
            }
            break;
        case ADD_MAGAZINE:
            break;
        case UPDATE_MAGAZINE:
            break;
        case DELETE_MAGAZINE:
            let newDeletedMagazineList = [...state.magazineList];
            let deletedMagazineList = [...action.payLoad];
            newDeletedMagazineList = newDeletedMagazineList
                .filter(x => !deletedMagazineList.some(deletedMagazine => deletedMagazine.magazineId === x.magazineId));
            newState = {
                ...state,
                magazineList: newDeletedMagazineList,
            }
            break;
        case GET_BOOK:
            newState = {
                ...state,
                bookList: [...action.payLoad],
            }
            break;
        case SET_BOOK:
            newState = {
                ...state,
                book: action.payLoad,
            }
            break;
        case ADD_BOOK:
            break;
        case UPDATE_BOOK:
            break;
        case DELETE_BOOK:
            let newDeletedBookList = [...state.bookList];
            let deletedBookList = [...action.payLoad];
            newDeletedBookList = newDeletedBookList
                .filter(x => !deletedBookList.some(deletedBook => deletedBook.bookId === x.bookId));
            newState = {
                ...state,
                bookList: newDeletedBookList,
            }
            break;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newState;
}

export default reducer;