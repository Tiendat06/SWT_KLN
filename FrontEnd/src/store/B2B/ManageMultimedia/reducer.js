import {
    DELETE_AUDIO,
    DELETE_IMAGE,
    DELETE_VIDEO,
    SET_IMAGE,
    GET_IMAGES,
    GET_SLIDESHOW,
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
            console.log(deletedImageList);
            newDeletedImageList = newDeletedImageList.filter(x => !deletedImageList.some(deletedImage => deletedImage.id === x.id));
            console.log(newDeletedImageList);
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
        case DELETE_VIDEO:
            let newDeletedVideoList = [...state.videoList];
            newDeletedVideoList = newDeletedVideoList.filter(x => x.id !== action.payLoad.id);
            newState = {
                ...state,
                videoList: newDeletedVideoList,
            }
            break;
        case DELETE_AUDIO:
            let newDeletedAudioList = [...state.audioList];
            newDeletedAudioList = newDeletedAudioList.filter(x => x.id !== action.payLoad.id);
            newState = {
                ...state,
                audioList: newDeletedAudioList,
            }
            break;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newState;
}

export default reducer;