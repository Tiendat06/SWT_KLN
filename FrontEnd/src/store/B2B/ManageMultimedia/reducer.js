import {DELETE_AUDIO, DELETE_IMAGE, DELETE_VIDEO} from "./constansts";

export const initialState = {
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
        case DELETE_IMAGE:
            // coding
            let newDeletedImageList = [...state.imageList];
            newDeletedImageList = newDeletedImageList.filter(x => x.id !== action.payLoad.id);
            newState = {
                ...state,
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