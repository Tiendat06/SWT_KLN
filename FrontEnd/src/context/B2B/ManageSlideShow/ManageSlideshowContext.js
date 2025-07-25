import React, {createContext, useContext, useState, useCallback, useReducer} from 'react';
import manageSlideshowReducer from '~/store/B2B/ManageSlideShow/reducer';
import { 
    setSlideshowAction,
    addTempImageAction,
    removeTempImagesAction,
    clearTempMediaAction
} from '~/store/B2B/ManageSlideShow/actions';

const ManageSlideshowContext = createContext();

export const useManageSlideshowContext = () => {
    const context = useContext(ManageSlideshowContext);
    if (!context) {
        throw new Error('useManageSlideshowContext must be used within a ManageSlideshowProvider');
    }
    return context;
};

export const ManageSlideshowProvider = ({children}) => {
    // Reducer state
    const [state, dispatch] = useReducer(manageSlideshowReducer, {
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
    });
    
    // Delete modal states
    const [visible, setVisible] = useState(false);
    
    // Create slideshow modal states
    const [createSlideshowModalVisible, setCreateSlideshowModalVisible] = useState(false);
    
    // Edit slideshow modal states
    const [editSlideshowModalVisible, setEditSlideshowModalVisible] = useState(false);
    const [editingSlideshow, setEditingSlideshow] = useState(null);
    
    // Add image modal states  
    const [addImageModalVisible, setAddImageModalVisible] = useState(false);
    
    // Edit image modal states
    const [editImageModalVisible, setEditImageModalVisible] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    
    // Delete image modal states
    const [deleteImageModalVisible, setDeleteImageModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    
    // Table selection states
    const [selectedSlideshows, setSelectedSlideshows] = useState([]);
    
    // Tab-specific selection states
    const [selectedImagesInTable, setSelectedImagesInTable] = useState([]);
    
    // Update trigger
    const [isUpdated, setIsUpdated] = useState(false);

    // Helper function to trigger delete for single item
    const triggerDeleteSingle = useCallback((item) => {
        setSelectedSlideshows([item]);
        // Set selectedSlideshow for single delete
        dispatch(setSlideshowAction(item));
        setVisible(true);
    }, [dispatch]);

    // Helper function to reset selection
    const resetSelection = useCallback(() => {
        setSelectedSlideshows([]);
        dispatch(setSlideshowAction(null));
    }, [dispatch]);

    // Helper functions for temp media - using reducer
    const addTempImage = useCallback((image) => {
        dispatch(addTempImageAction(image));
    }, [dispatch]);

    const removeTempImages = useCallback((imageIds) => {
        dispatch(removeTempImagesAction(imageIds));
    }, [dispatch]);

    const clearTempMedia = useCallback(() => {
        dispatch(clearTempMediaAction());
    }, [dispatch]);

    // Helper functions for editing media
    const setEditingMedia = useCallback((media) => {
        if (media.imageLink) {
            // It's an image
            setEditingImage(media);
        }
    }, []);

    const setEditMediaModalVisible = useCallback((visible, mediaType) => {
        if (mediaType === 'image') {
            setEditImageModalVisible(visible);
        } else {
            // Auto-detect based on current editing state
            if (editingImage) {
                setEditImageModalVisible(visible);
            }
        }
    }, [editingImage]);

    const value = {
        // Reducer state and dispatch
        ...state,
        dispatch,
        
        // Delete modal
        visible,
        setVisible,
        triggerDeleteSingle,
        resetSelection,
        
        // Create slideshow modal
        createSlideshowModalVisible,
        setCreateSlideshowModalVisible,
        
        // Edit slideshow modal
        editSlideshowModalVisible,
        setEditSlideshowModalVisible,
        editingSlideshow,
        setEditingSlideshow,
        
        // Add image modal
        addImageModalVisible,
        setAddImageModalVisible,
        
        // Edit image modal
        editImageModalVisible,
        setEditImageModalVisible,
        editingImage,
        setEditingImage,
        
        // Delete image modal
        deleteImageModalVisible,
        setDeleteImageModalVisible,
        selectedImages,
        setSelectedImages,
        
        // Table selection
        selectedSlideshows,
        setSelectedSlideshows,
        
        // Tab-specific selection
        selectedImagesInTable,
        setSelectedImagesInTable,
        
        // Update trigger
        isUpdated,
        setIsUpdated,
        
        // Temp media (from reducer)
        tempImages: state.tempImages,
        addTempImage,
        removeTempImages,
        clearTempMedia,
        
        // Helper functions for editing media
        setEditingMedia,
        setEditMediaModalVisible,
    };

    return (
        <ManageSlideshowContext.Provider value={value}>
            {children}
        </ManageSlideshowContext.Provider>
    );
};
 