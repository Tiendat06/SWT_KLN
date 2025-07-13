import {
    GET_TOPICS,
    SET_TOPIC,
    ADD_TOPIC,
    UPDATE_TOPIC,
    DELETE_TOPIC,
    GET_TOPIC_IMAGES,
    SET_TOPIC_IMAGE,
    ADD_TOPIC_IMAGE,
    UPDATE_TOPIC_IMAGE,
    DELETE_TOPIC_IMAGE,
    GET_TOPIC_VIDEOS,
    SET_TOPIC_VIDEO,
    ADD_TOPIC_VIDEO,
    UPDATE_TOPIC_VIDEO,
    DELETE_TOPIC_VIDEO,
    GET_TOPIC_DETAIL,
    SET_TOPIC_DETAIL,
    SET_LOADING,
    SET_TOPIC_IMAGES_LOADING,
    SET_TOPIC_VIDEOS_LOADING,
    ADD_TEMP_IMAGE,
    ADD_TEMP_VIDEO,
    REMOVE_TEMP_IMAGES,
    REMOVE_TEMP_VIDEOS,
    CLEAR_TEMP_MEDIA
} from './constants';

// Topic actions
export const getTopicsAction = payLoad => {
    return {
        type: GET_TOPICS,
        payLoad,
    }
}

export const setTopicAction = payLoad => {
    return {
        type: SET_TOPIC,
        payLoad,
    }
}

export const addTopicAction = payLoad => {
    return {
        type: ADD_TOPIC,
        payLoad,
    }
}

export const updateTopicAction = payLoad => {
    return {
        type: UPDATE_TOPIC,
        payLoad,
    }
}

export const deleteTopicAction = payLoad => {
    return {
        type: DELETE_TOPIC,
        payLoad
    }
}

// Topic Image actions
export const getTopicImagesAction = payLoad => {
    return {
        type: GET_TOPIC_IMAGES,
        payLoad,
    }
}

export const setTopicImageAction = payLoad => {
    return {
        type: SET_TOPIC_IMAGE,
        payLoad,
    }
}

export const addTopicImageAction = payLoad => {
    return {
        type: ADD_TOPIC_IMAGE,
        payLoad,
    }
}

export const updateTopicImageAction = payLoad => {
    return {
        type: UPDATE_TOPIC_IMAGE,
        payLoad,
    }
}

export const deleteTopicImageAction = payLoad => {
    return {
        type: DELETE_TOPIC_IMAGE,
        payLoad
    }
}

// Topic Video actions
export const getTopicVideosAction = payLoad => {
    return {
        type: GET_TOPIC_VIDEOS,
        payLoad,
    }
}

export const setTopicVideoAction = payLoad => {
    return {
        type: SET_TOPIC_VIDEO,
        payLoad,
    }
}

export const addTopicVideoAction = payLoad => {
    return {
        type: ADD_TOPIC_VIDEO,
        payLoad,
    }
}

export const updateTopicVideoAction = payLoad => {
    return {
        type: UPDATE_TOPIC_VIDEO,
        payLoad,
    }
}

export const deleteTopicVideoAction = payLoad => {
    return {
        type: DELETE_TOPIC_VIDEO,
        payLoad
    }
}

// Topic Detail actions
export const getTopicDetailAction = payLoad => {
    return {
        type: GET_TOPIC_DETAIL,
        payLoad,
    }
}

export const setTopicDetailAction = payLoad => {
    return {
        type: SET_TOPIC_DETAIL,
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

export const setTopicImagesLoadingAction = payLoad => {
    return {
        type: SET_TOPIC_IMAGES_LOADING,
        payLoad,
    }
}

export const setTopicVideosLoadingAction = payLoad => {
    return {
        type: SET_TOPIC_VIDEOS_LOADING,
        payLoad,
    }
}

// Temp Media actions
export const addTempImageAction = payLoad => {
    return {
        type: ADD_TEMP_IMAGE,
        payLoad,
    }
}

export const addTempVideoAction = payLoad => {
    return {
        type: ADD_TEMP_VIDEO,
        payLoad,
    }
}

export const removeTempImagesAction = payLoad => {
    return {
        type: REMOVE_TEMP_IMAGES,
        payLoad,
    }
}

export const removeTempVideosAction = payLoad => {
    return {
        type: REMOVE_TEMP_VIDEOS,
        payLoad,
    }
}

export const clearTempMediaAction = () => {
    return {
        type: CLEAR_TEMP_MEDIA,
    }
} 