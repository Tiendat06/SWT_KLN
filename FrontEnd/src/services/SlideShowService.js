import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const slideShowRoute = 'api/SlideShow';

const getSlideShowByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/${id}`,
    })
}

const getSlideShowListService = async (fetch = DEFAULT_FETCH,
                                       page = DEFAULT_PAGE,
                                       type = MediaType.None,
                                       slideShowType = SlideShowType.None,
                                       keyword = "") => {
    return await UseFetchAPI({
        api: `${slideShowRoute}`,
        params: {
            fetch, page, type, keyword, slideShowType
        }
    })
}

const deleteSlideImageInSpecificSlideShowService = async (
    ids,
    mediaType = MediaType.None,
    slideShowType = SlideShowType.None) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/SlideImage`,
        method: "DELETE",
        body: JSON.stringify({
            ids,
            mediaType,
            slideShowType
        })
    });
}

const deleteSlideImageInSpecificSlideShowBySlideShowIdService = async (
    ids,
    slideShowId) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/SlideImage`,
        method: "DELETE",
        body: JSON.stringify({
            slideShowId,
            ids
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
}

const getTotalSlideImageInSpecificSlideShowService = async (
    type = MediaType.None,
    slideShowType = SlideShowType.None) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/total`,
        params: {
            type, slideShowType
        }
    });
}

const addSlideImageInSpecificSlideShowService = async (slideshowId, createDataArray, type = MediaType.None, slideShowType = SlideShowType.None, userId = null) => {
    const formData = new FormData();
    formData.append("SlideShowId", slideshowId);
    formData.append("MediaTypeId", type);
    formData.append("SlideShowTypeId", slideShowType);
    if (userId) {
        formData.append("UserId", userId);
    }
    
    // Xử lý SlideImages như mảng theo cấu trúc backend
    createDataArray.forEach((createData, index) => {
        formData.append(`SlideImages[${index}].Capture`, createData.capture);
        
        if (createData.imageFile) {
            formData.append(`SlideImages[${index}].ImageLink`, createData.imageFile);
        }
    });

    return await UseFetchAPI({
        api: `${slideShowRoute}/SlideImage`,
        method: "POST",
        body: formData,
        headers: null
    });
}

const createSlideShowWithImages = async (slideShowData, type = MediaType.None, slideShowType = SlideShowType.None, userId = null) => {
    const formData = new FormData();
    formData.append('Title', slideShowData.title);
    formData.append('Description', slideShowData.description || '');
    formData.append('MediaTypeId', type);
    formData.append('SlideShowTypeId', slideShowType);
    if (userId) {
        formData.append('UserId', userId);
    }
    
    // Add poster/thumbnail image (required)
    if (slideShowData.posterImage) {
        formData.append('Image', slideShowData.posterImage);
    }
    
    if (!slideShowData.posterImage) {
        console.error('Missing poster image - this is required by the backend!');
    }
    
    if (!slideShowData.images || slideShowData.images.length === 0) {
        console.warn('No slideshow images provided!');
    }
    
    slideShowData.images.forEach((img, idx) => {
        if (!img.file) {
            console.error(`Image ${idx} missing file!`);
            return;
        }
        
        formData.append(`SlideImage[${idx}].Capture`, img.capture || '');
        formData.append(`SlideImage[${idx}].slideImage`, img.file); // Thay đổi từ SlideImage thành slideImage
    });
    
    try {
        const result = await UseFetchAPI({
            api: `${slideShowRoute}`,
            method: 'POST',
            body: formData,
            headers: null // Let UseFetchAPI handle FormData headers properly
        });
        
        return result;
    } catch (error) {
        console.error('API Call Failed:', error);
        throw error;
    }
};

const updateSlideShowService = async (slideShowId, slideShowData, type = MediaType.None, slideShowType = SlideShowType.None, userId = null) => {
    const formData = new FormData();
    formData.append('Title', slideShowData.title);
    formData.append('Description', slideShowData.description || '');
    formData.append('MediaTypeId', type);
    formData.append('SlideShowTypeId', slideShowType);
    if (userId) {
        formData.append('UserId', userId);
    }
    
    // Add poster/thumbnail image if provided
    if (slideShowData.posterImage) {
        formData.append('Image', slideShowData.posterImage);
    }
    
    if (slideShowData.images && slideShowData.images.length > 0) {
        slideShowData.images.forEach((img, idx) => {
            formData.append(`SlideImage[${idx}].Capture`, img.capture);
            formData.append(`SlideImage[${idx}].slideImage`, img.file); // Thay đổi từ SlideImage thành slideImage
        });
    }
    
    return await UseFetchAPI({
        api: `${slideShowRoute}/${slideShowId}`,
        method: 'PUT',
        body: formData,
        headers: null
    });
};

export const addVideoToSpecificSlideShowService = async (formData) => {
    return await UseFetchAPI({
        api: `api/SlideShow/video`,
        method: "PUT",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

const updateSlideshowImageService = async (slideshowId, updateDataArray, type = MediaType.None, slideShowType = SlideShowType.None, userId = null) => {
    const formData = new FormData();
    formData.append("SlideShowId", slideshowId);
    formData.append("MediaTypeId", type);
    formData.append("SlideShowTypeId", slideShowType);
    if (userId) {
        formData.append("UserId", userId);
    }
    
    // Xử lý SlideImages như mảng theo cấu trúc backend
    updateDataArray.forEach((updateData, index) => {
        formData.append(`SlideImages[${index}].Id`, updateData.id);
        formData.append(`SlideImages[${index}].Capture`, updateData.capture);
        
        if (updateData.imageFile) {
            formData.append(`SlideImages[${index}].ImageLink`, updateData.imageFile);
        }
    });

    return await UseFetchAPI({
        api: `${slideShowRoute}/SlideImage`,
        method: "PUT",
        body: formData,
        headers: null
    });
}

const deleteSlideshowService = async (ids) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}`,
        method: "DELETE",
        body: JSON.stringify({ Ids: ids }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const deleteSlideshowImageService = async (slideshowId, imageId) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/SlideImage`,
        method: "DELETE",
        body: JSON.stringify({ 
            SlideShowId: slideshowId,
            Ids: [imageId]
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const deleteSlideshowImagesService = async (slideshowId, imageIds) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/SlideImage`,
        method: "DELETE",
        body: JSON.stringify({ 
            SlideShowId: slideshowId,
            Ids: imageIds
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const getSlideImageByIdService = async (id, slideShowId) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/SlideImage`,
        params: {
            slideImageId: id,
            slideShowId
        },
    })
}

export const slideShowService = {
    getSlideShowByIdService,
    getSlideShowListService,
    deleteSlideImageInSpecificSlideShowService,
    deleteSlideImageInSpecificSlideShowBySlideShowIdService,
    getTotalSlideImageInSpecificSlideShowService,
    addSlideImageInSpecificSlideShowService,
    createSlideShowWithImages,
    updateSlideShowService,
    updateSlideshowImageService,
    deleteSlideshowService,
    deleteSlideshowImageService,
    deleteSlideshowImagesService,
    getSlideImageByIdService
}


