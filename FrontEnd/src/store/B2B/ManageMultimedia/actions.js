import {
    DELETE_IMAGE,
    DELETE_AUDIO,
    DELETE_VIDEO,
    SET_IMAGE,
    GET_IMAGES,
    GET_SLIDESHOW, SET_VIDEO, GET_VIDEO, SET_AUDIO, GET_AUDIO, ADD_IMAGE,
} from './constansts';
import {SET_SLIDESHOW} from "~/store/B2B/ManageSlideShow/constants";

export const setSlideShowAction = payLoad => {
    return {
        type: SET_SLIDESHOW,
        payLoad,
    }
}

export const getSlideShowAction = payLoad => {
    return {
        type: GET_SLIDESHOW,
        payLoad,
    }
}

export const setImageAction = payLoad => {
    return {
        type: SET_IMAGE,
        payLoad,
    }
}

export const getImagesAction = payLoad => {
    return {
        type: GET_IMAGES,
        payLoad,
    }
}

export const deleteImageAction = payLoad => {
    return {
        type: DELETE_IMAGE,
        payLoad
    }
}

export const addImageAction = payLoad => {
    return {
        type: ADD_IMAGE,
        payLoad,
    }
}

export const setVideoAction = payLoad => {
    return {
        type: SET_VIDEO,
        payLoad,
    }
}

export const getVideoAction = payLoad => {
    return {
        type: GET_VIDEO,
        payLoad,
    }
}

export const deleteVideoAction = payLoad => {
    return {
        type: DELETE_VIDEO,
        payLoad
    }
}

export const setAudioAction = payLoad => {
    return {
        type: SET_AUDIO,
        payLoad,
    }
}

export const getAudioAction = payLoad => {
    return {
        type: GET_AUDIO,
        payLoad,
    }
}

export const deleteAudioAction = payLoad => {
    return {
        type: DELETE_AUDIO,
        payLoad
    }
}