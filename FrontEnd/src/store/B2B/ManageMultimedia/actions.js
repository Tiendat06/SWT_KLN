import {DELETE_IMAGE, DELETE_AUDIO, DELETE_VIDEO} from './constansts';

export const deleteImage = payLoad => {
    return {
        type: DELETE_IMAGE,
        payLoad
    }
}

export const deleteVideo = payLoad => {
    return {
        type: DELETE_VIDEO,
        payLoad
    }
}

export const deleteAudio = payLoad => {
    return {
        type: DELETE_AUDIO,
        payLoad
    }
}