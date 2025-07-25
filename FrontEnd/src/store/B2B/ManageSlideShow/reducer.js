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

const initialState = {
    // Slideshows
    slideshows: [],
    selectedSlideshow: null,
    slideshowDetail: null,
    
    // Slideshow Images
    slideshowImages: [],
    selectedSlideshowImage: null,
    
    // Temp Media (for create slideshow)
    tempImages: [],
    
    // Loading states
    isLoading: false,
    isSlideshowImagesLoading: false,
};

const manageSlideshowReducer = (state = initialState, action) => {
    switch (action.type) {
        // SlideShow cases
        case GET_SLIDESHOWS:
            return {
                ...state,
                slideshows: action.payLoad,
            };
        case SET_SLIDESHOW:
            return {
                ...state,
                selectedSlideshow: action.payLoad,
            };
        case ADD_SLIDESHOW:
            return {
                ...state,
                slideshows: [...state.slideshows, action.payLoad],
            };
        case UPDATE_SLIDESHOW:
            return {
                ...state,
                slideshows: state.slideshows.map(slideshow =>
                    slideshow.id === action.payLoad.id ? action.payLoad : slideshow
                ),
            };
        case DELETE_SLIDESHOW:
            return {
                ...state,
                slideshows: state.slideshows.filter(slideshow => slideshow.id !== action.payLoad),
            };

        // SlideShow Image cases
        case GET_SLIDESHOW_IMAGES:
            return {
                ...state,
                slideshowImages: action.payLoad,
            };
        case SET_SLIDESHOW_IMAGE:
            return {
                ...state,
                selectedSlideshowImage: action.payLoad,
            };
        case ADD_SLIDESHOW_IMAGE:
            return {
                ...state,
                slideshowImages: [...state.slideshowImages, action.payLoad],
            };
        case UPDATE_SLIDESHOW_IMAGE:
            return {
                ...state,
                slideshowImages: state.slideshowImages.map(image =>
                    image.id === action.payLoad.id ? action.payLoad : image
                ),
            };
        case DELETE_SLIDESHOW_IMAGE:
            return {
                ...state,
                slideshowImages: state.slideshowImages.filter(image => {
                    // Hỗ trợ cả single ID và array IDs
                    if (Array.isArray(action.payLoad)) {
                        return !action.payLoad.includes(image.id);
                    } else {
                        return image.id !== action.payLoad;
                    }
                }),
            };

        // SlideShow Detail cases
        case GET_SLIDESHOW_DETAIL:
        case SET_SLIDESHOW_DETAIL:
            return {
                ...state,
                slideshowDetail: action.payLoad,
            };

        // Loading cases
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payLoad,
            };
        case SET_SLIDESHOW_IMAGES_LOADING:
            return {
                ...state,
                isSlideshowImagesLoading: action.payLoad,
            };

        // Temp Media cases (for create slideshow)
        case ADD_TEMP_IMAGE:
            return {
                ...state,
                tempImages: [...state.tempImages, action.payLoad],
            };
        case REMOVE_TEMP_IMAGES:
            return {
                ...state,
                tempImages: state.tempImages.filter(image => !action.payLoad.includes(image.id)),
            };
        case CLEAR_TEMP_MEDIA:
            return {
                ...state,
                tempImages: [],
            };

        default:
            return state;
    }
};

export default manageSlideshowReducer;
 