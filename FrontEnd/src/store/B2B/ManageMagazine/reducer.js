import {ADD_MAGAZINE, DELETE_MAGAZINE, GET_MAGAZINE, UPDATE_MAGAZINE} from "~/store/B2B/ManageMagazine/constansts";

export const initialState = {
    magazine: {},
    magazineList: [],

    book: {},
    bookList: [],
}

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case GET_MAGAZINE:
            newState = {
                ...state,
                bookList: [...action.payLoad],
            }
            break;
        case ADD_MAGAZINE:
            break;
        case UPDATE_MAGAZINE:
            break;
        case DELETE_MAGAZINE:
            break;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newState;
}

export default reducer;