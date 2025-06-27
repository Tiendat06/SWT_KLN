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
    SET_TOPIC_VIDEOS_LOADING
} from './constants';

const initialState = {
    // Topics
    topics: [],
    selectedTopic: null,
    topicDetail: null,
    
    // Topic Images
    topicImages: [],
    selectedTopicImage: null,
    
    // Topic Videos
    topicVideos: [],
    selectedTopicVideo: null,
    
    // Loading states
    isLoading: false,
    isTopicImagesLoading: false,
    isTopicVideosLoading: false,
};

const manageTopicReducer = (state = initialState, action) => {
    switch (action.type) {
        // Topic cases
        case GET_TOPICS:
            return {
                ...state,
                topics: action.payLoad
            };
            
        case SET_TOPIC:
            return {
                ...state,
                selectedTopic: action.payLoad
            };
            
        case ADD_TOPIC:
            return {
                ...state,
                topics: [...state.topics, action.payLoad]
            };
            
        case UPDATE_TOPIC:
            return {
                ...state,
                topics: state.topics.map(topic => 
                    topic.topicId === action.payLoad.topicId ? action.payLoad : topic
                ),
                selectedTopic: action.payLoad
            };
            
        case DELETE_TOPIC:
            return {
                ...state,
                topics: state.topics.filter(topic => 
                    !action.payLoad.includes(topic.topicId)
                )
            };
            
        // Topic Images cases
        case GET_TOPIC_IMAGES:
            return {
                ...state,
                topicImages: action.payLoad
            };
            
        case SET_TOPIC_IMAGE:
            return {
                ...state,
                selectedTopicImage: action.payLoad
            };
            
        case ADD_TOPIC_IMAGE:
            return {
                ...state,
                topicImages: [...state.topicImages, action.payLoad]
            };
            
        case UPDATE_TOPIC_IMAGE:
            return {
                ...state,
                topicImages: state.topicImages.map(image => 
                    image.id === action.payLoad.id ? action.payLoad : image
                ),
                selectedTopicImage: action.payLoad
            };
            
        case DELETE_TOPIC_IMAGE:
            return {
                ...state,
                topicImages: state.topicImages.filter(image => 
                    !action.payLoad.includes(image.id)
                )
            };
            
        // Topic Videos cases
        case GET_TOPIC_VIDEOS:
            return {
                ...state,
                topicVideos: action.payLoad
            };
            
        case SET_TOPIC_VIDEO:
            return {
                ...state,
                selectedTopicVideo: action.payLoad
            };
            
        case ADD_TOPIC_VIDEO:
            return {
                ...state,
                topicVideos: [...state.topicVideos, action.payLoad]
            };
            
        case UPDATE_TOPIC_VIDEO:
            return {
                ...state,
                topicVideos: state.topicVideos.map(video => 
                    video.id === action.payLoad.id ? action.payLoad : video
                ),
                selectedTopicVideo: action.payLoad
            };
            
        case DELETE_TOPIC_VIDEO:
            return {
                ...state,
                topicVideos: state.topicVideos.filter(video => 
                    !action.payLoad.includes(video.id)
                )
            };
            
        // Topic Detail cases
        case GET_TOPIC_DETAIL:
            return {
                ...state,
                topicDetail: action.payLoad
            };
            
        case SET_TOPIC_DETAIL:
            return {
                ...state,
                topicDetail: action.payLoad
            };
            
        // Loading cases
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payLoad
            };
            
        case SET_TOPIC_IMAGES_LOADING:
            return {
                ...state,
                isTopicImagesLoading: action.payLoad
            };
            
        case SET_TOPIC_VIDEOS_LOADING:
            return {
                ...state,
                isTopicVideosLoading: action.payLoad
            };
            
        default:
            return state;
    }
};

export default manageTopicReducer; 