import {ADD_MAGAZINE, DELETE_MAGAZINE, GET_MAGAZINE, UPDATE_MAGAZINE} from "~/store/B2B/ManageMagazine/constansts";

export const getMagazineAction = payLoad => {
    return {
        type: GET_MAGAZINE,
        payLoad,
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