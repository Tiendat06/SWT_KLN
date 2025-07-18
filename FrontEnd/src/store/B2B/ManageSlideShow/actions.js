import {
    GET_SLIDESHOWS,
    SET_SLIDESHOW,
    ADD_SLIDESHOW,
    UPDATE_SLIDESHOW,
    DELETE_SLIDESHOW,
    GET_SLIDESHOW_IMAGES,
    SET_SLIDESHOW_IMAGE,
    ADD_SLIDESHOW_IMAGE,
    UPDATE_SLIDESHOW_IMAGE,
    DELETE_SLIDESHOW_IMAGE,
    GET_SLIDESHOW_DETAIL,
    SET_SLIDESHOW_DETAIL,
    SET_LOADING,
    SET_SLIDESHOW_IMAGES_LOADING,
    ADD_TEMP_IMAGE,
    REMOVE_TEMP_IMAGES,
    CLEAR_TEMP_MEDIA
} from './constants';

// SlideShow actions
export const getSlideshowsAction = payLoad => {
    return {
        type: GET_SLIDESHOWS,
        payLoad,
    }
}

export const setSlideshowAction = payLoad => {
    return {
        type: SET_SLIDESHOW,
        payLoad,
    }
}

export const addSlideshowAction = payLoad => {
    return {
        type: ADD_SLIDESHOW,
        payLoad,
    }
}

export const updateSlideshowAction = payLoad => {
    return {
        type: UPDATE_SLIDESHOW,
        payLoad,
    }
}

export const deleteSlideshowAction = payLoad => {
    return {
        type: DELETE_SLIDESHOW,
        payLoad,
    }
}

// SlideShow Image actions
export const getSlideshowImagesAction = payLoad => {
    return {
        type: GET_SLIDESHOW_IMAGES,
        payLoad,
    }
}

export const setSlideshowImageAction = payLoad => {
    return {
        type: SET_SLIDESHOW_IMAGE,
        payLoad,
    }
}

export const addSlideshowImageAction = payLoad => {
    return {
        type: ADD_SLIDESHOW_IMAGE,
        payLoad,
    }
}

export const updateSlideshowImageAction = payLoad => {
    return {
        type: UPDATE_SLIDESHOW_IMAGE,
        payLoad,
    }
}

export const deleteSlideshowImageAction = payLoad => {
    return {
        type: DELETE_SLIDESHOW_IMAGE,
        payLoad,
    }
}

// SlideShow Detail actions
export const getSlideshowDetailAction = payLoad => {
    return {
        type: GET_SLIDESHOW_DETAIL,
        payLoad,
    }
}

export const setSlideshowDetailAction = payLoad => {
    return {
        type: SET_SLIDESHOW_DETAIL,
        payLoad,
    }
}

// Loading actions
export const setLoadingAction = payLoad => {
    return {
        type: SET_LOADING,
        payLoad,
    }
}

export const setSlideshowImagesLoadingAction = payLoad => {
    return {
        type: SET_SLIDESHOW_IMAGES_LOADING,
        payLoad,
    }
}

// Temp Media actions (for create slideshow)
export const addTempImageAction = payLoad => {
    return {
        type: ADD_TEMP_IMAGE,
        payLoad,
    }
}

export const removeTempImagesAction = payLoad => {
    return {
        type: REMOVE_TEMP_IMAGES,
        payLoad,
    }
}

export const clearTempMediaAction = () => {
    return {
        type: CLEAR_TEMP_MEDIA,
    }
}
