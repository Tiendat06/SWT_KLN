import {
    DELETE_IMAGE,
    DELETE_AUDIO,
    DELETE_VIDEO,
    SET_IMAGE,
    GET_IMAGES,
    GET_SLIDESHOW,
} from './constansts';

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

export const deleteVideoAction = payLoad => {
    return {
        type: DELETE_VIDEO,
        payLoad
    }
}

export const deleteAudioAction = payLoad => {
    return {
        type: DELETE_AUDIO,
        payLoad
    }
}