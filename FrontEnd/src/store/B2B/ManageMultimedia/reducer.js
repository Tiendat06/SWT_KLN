import {
    DELETE_AUDIO,
    DELETE_IMAGE,
    DELETE_VIDEO,
    SET_IMAGE,
    GET_IMAGES,
    GET_SLIDESHOW, SET_VIDEO, GET_VIDEO, SET_AUDIO, GET_AUDIO,
} from "./constansts";

export const initialState = {
    isUpdated: false,

    slideShow: {},

    image: {},
    imageList: [],

    video: {},
    videoList: [],

    audio: {},
    audioList: [],
};

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        // slideshow
        case GET_SLIDESHOW:
            newState = {
                ...state,
                slideShow: action.payLoad,
            }
            break;
        // image
        case SET_IMAGE:
            newState = {
                ...state,
                image: action.payLoad,
            }
            break;
        case GET_IMAGES:
            newState = {
                ...state,
                imageList: [...action.payLoad]
            }
            break;
        case DELETE_IMAGE:
            let newDeletedImageList = [...state.imageList];
            let deletedImageList = [...action.payLoad];
            newDeletedImageList = newDeletedImageList.filter(x => !deletedImageList.some(deletedImage => deletedImage.id === x.id));
            newState = {
                ...state,
                isUpdated: !state.isUpdated,
                slideShow: {
                    ...state.slideShow,
                    slideImage: newDeletedImageList,
                },
                imageList: newDeletedImageList,
            }
            break;
        // video
        case SET_VIDEO:
            newState = {
                ...state,
                video: action.payLoad,
            }
            break;
        case GET_VIDEO:
            newState = {
                ...state,
                videoList: [...action.payLoad]
            }
            break;
        case DELETE_VIDEO:
            let newDeletedVideoList = [...state.videoList];
            let deletedVideoList = [...action.payLoad];
            newDeletedVideoList = newDeletedVideoList.filter(x => !deletedVideoList.some(deletedVideo => deletedVideo.videoId === x.videoId));
            newState = {
                ...state,
                isUpdated: !state.isUpdated,
                videoList: newDeletedVideoList,
            }
            break;
        case SET_AUDIO:
            newState = {
                ...state,
                audio: action.payLoad,
            }
            break;
        case GET_AUDIO:
            newState = {
                ...state,
                audioList: [...action.payLoad]
            }
            break;
        case DELETE_AUDIO:
            let newDeletedAudioList = [...state.audioList];
            let deletedAudioList = [...action.payLoad];
            newDeletedAudioList = newDeletedAudioList.filter(x => !deletedAudioList.some(deletedAudio => deletedAudio.musicId === x.musicId));
            newState = {
                ...state,
                isUpdated: !state.isUpdated,
                audioList: newDeletedAudioList,
            }
            break;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newState;
}

export default reducer;