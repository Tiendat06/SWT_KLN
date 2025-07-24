import React, {createContext, useContext, useState, useCallback, useReducer} from 'react';
import manageTopicReducer from '~/store/B2B/ManageTopic/reducer';
import { 
    setTopicAction,
    addTempImageAction,
    addTempVideoAction,
    removeTempImagesAction,
    removeTempVideosAction,
    clearTempMediaAction
} from '~/store/B2B/ManageTopic/actions';

const ManageTopicContext = createContext();

export const useManageTopicContext = () => {
    const context = useContext(ManageTopicContext);
    if (!context) {
        throw new Error('useManageTopicContext must be used within a ManageTopicProvider');
    }
    return context;
};

export const ManageTopicProvider = ({children}) => {
    // Reducer state
    const [state, dispatch] = useReducer(manageTopicReducer, {
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
        
        // Temp Media (for create topic)
        tempImages: [],
        tempVideos: [],
        
        // Loading states
        isLoading: false,
        isTopicImagesLoading: false,
        isTopicVideosLoading: false,
    });
    
    // Delete modal states
    const [visible, setVisible] = useState(false);
    
    // Create topic modal states
    const [createTopicModalVisible, setCreateTopicModalVisible] = useState(false);
    
    // Edit topic modal states
    const [editTopicModalVisible, setEditTopicModalVisible] = useState(false);
    const [editingTopic, setEditingTopic] = useState(null);
    
    // Add image modal states  
    const [addImageModalVisible, setAddImageModalVisible] = useState(false);
    
    // Add video modal states  
    const [addVideoModalVisible, setAddVideoModalVisible] = useState(false);
    
    // Edit image modal states
    const [editImageModalVisible, setEditImageModalVisible] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    
    // Edit video modal states
    const [editVideoModalVisible, setEditVideoModalVisible] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    
    // Delete image modal states
    const [deleteImageModalVisible, setDeleteImageModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    
    // Delete video modal states
    const [deleteVideoModalVisible, setDeleteVideoModalVisible] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);
    
    // Table selection states
    const [selectedTopics, setSelectedTopics] = useState([]);
    
    // Tab-specific selection states
    const [selectedImagesInTable, setSelectedImagesInTable] = useState([]);
    const [selectedVideosInTable, setSelectedVideosInTable] = useState([]);
    
    // Update trigger
    const [isUpdated, setIsUpdated] = useState(false);
    
    // Temp media is now managed by reducer - no separate state needed

    // Helper function to trigger delete for single item
    const triggerDeleteSingle = useCallback((item) => {
        setSelectedTopics([item]);
        // Set selectedTopic for single delete
        dispatch(setTopicAction(item));
        setVisible(true);
    }, [dispatch]);

    // Helper function to reset selection
    const resetSelection = useCallback(() => {
        setSelectedTopics([]);
        dispatch(setTopicAction(null));
    }, [dispatch]);

    // Helper functions for temp media - now using reducer
    const addTempImage = useCallback((image) => {
        dispatch(addTempImageAction(image));
    }, [dispatch]);

    const addTempVideo = useCallback((video) => {
        dispatch(addTempVideoAction(video));
    }, [dispatch]);

    const removeTempImages = useCallback((imageIds) => {
        dispatch(removeTempImagesAction(imageIds));
    }, [dispatch]);

    const removeTempVideos = useCallback((videoIds) => {
        dispatch(removeTempVideosAction(videoIds));
    }, [dispatch]);

    const clearTempMedia = useCallback(() => {
        dispatch(clearTempMediaAction());
    }, [dispatch]);

    // Helper functions for editing media (works for both images and videos)
    const setEditingMedia = useCallback((media) => {
        if (media.imageLink) {
            // It's an image
            setEditingImage(media);
        } else if (media.videoLink) {
            // It's a video
            setEditingVideo(media);
        }
    }, []);

    const setEditMediaModalVisible = useCallback((visible, mediaType) => {
        if (mediaType === 'image') {
            setEditImageModalVisible(visible);
        } else if (mediaType === 'video') {
            setEditVideoModalVisible(visible);
        } else {
            // Auto-detect based on current editing state
            if (editingImage) {
                setEditImageModalVisible(visible);
            } else if (editingVideo) {
                setEditVideoModalVisible(visible);
            }
        }
    }, [editingImage, editingVideo]);

    const value = {
        // Reducer state and dispatch
        ...state,
        dispatch,
        
        // Delete modal
        visible,
        setVisible,
        triggerDeleteSingle,
        resetSelection,
        
        // Create topic modal
        createTopicModalVisible,
        setCreateTopicModalVisible,
        
        // Edit topic modal
        editTopicModalVisible,
        setEditTopicModalVisible,
        editingTopic,
        setEditingTopic,
        
        // Add image modal
        addImageModalVisible,
        setAddImageModalVisible,
        
        // Add video modal
        addVideoModalVisible,
        setAddVideoModalVisible,
        
        // Edit image modal
        editImageModalVisible,
        setEditImageModalVisible,
        editingImage,
        setEditingImage,
        
        // Edit video modal
        editVideoModalVisible,
        setEditVideoModalVisible,
        editingVideo,
        setEditingVideo,
        
        // Delete image modal
        deleteImageModalVisible,
        setDeleteImageModalVisible,
        selectedImages,
        setSelectedImages,
        
        // Delete video modal
        deleteVideoModalVisible,
        setDeleteVideoModalVisible,
        selectedVideos,
        setSelectedVideos,
        
        // Table selection
        selectedTopics,
        setSelectedTopics,
        
        // Tab-specific selection
        selectedImagesInTable,
        setSelectedImagesInTable,
        selectedVideosInTable,
        setSelectedVideosInTable,
        
        // Update trigger
        isUpdated,
        setIsUpdated,
        
        // Temp media (from reducer)
        tempImages: state.tempImages,
        tempVideos: state.tempVideos,
        addTempImage,
        addTempVideo,
        removeTempImages,
        removeTempVideos,
        clearTempMedia,
        
        // Helper functions for editing media
        setEditingMedia,
        setEditMediaModalVisible,
    };

    return (
        <ManageTopicContext.Provider value={value}>
            {children}
        </ManageTopicContext.Provider>
    );
}; 