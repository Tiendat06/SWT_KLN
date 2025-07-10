import {
    ADD_BOOK,
    ADD_MAGAZINE, DELETE_BOOK,
    DELETE_MAGAZINE,
    GET_BOOK,
    GET_MAGAZINE, SET_BOOK, SET_MAGAZINE, UPDATE_BOOK,
    UPDATE_MAGAZINE
} from "~/store/B2B/ManageMagazine/constansts";

export const getBookAction = payLoad => {
    return {
        type: GET_BOOK,
        payLoad
    }
}

export const setBookAction = payLoad => {
    return {
        type: SET_BOOK,
        payLoad
    }
}

export const addBookAction = payLoad => {
    return {
        type: ADD_BOOK,
        payLoad
    }
}

export const updateBookAction = payLoad => {
    return {
        type: UPDATE_BOOK,
        payLoad
    }
}

export const deleteBookAction = payLoad => {
    return {
        type: DELETE_BOOK,
        payLoad
    }
}

export const getMagazineAction = payLoad => {
    return {
        type: GET_MAGAZINE,
        payLoad,
    }
}

export const setMagazineAction = payLoad => {
    return {
        type: SET_MAGAZINE,
        payLoad
    }
}

export const addMagazineAction = payLoad => {
    return {
        type: ADD_MAGAZINE,
        payLoad,
    }
}

export const updateMagazineAction = payLoad => {
    return {
        type: UPDATE_MAGAZINE,
        payLoad,
    }
}

export const deleteMagazineAction = payLoad => {
    return {
        type: DELETE_MAGAZINE,
        payLoad
    }
}