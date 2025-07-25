import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import TopicType from "~/enum/Topic/TopicType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const topicRoute = 'api/Topic';

const getTopicListService = async (fetch = DEFAULT_FETCH,
                                   page = DEFAULT_PAGE,
                                   type = MediaType.None,
                                   topicType = TopicType.None,
                                   keyword = "") => {
    return await UseFetchAPI({
        api: `${topicRoute}`,
        params: {
            fetch, page, type, keyword, topicType
        }
    })
}

const getTopicByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${topicRoute}/${id}`,
    })
}

const createTopicService = async (topicData) => {
    return await UseFetchAPI({
        api: `${topicRoute}`,
        method: "POST",
        body: JSON.stringify(topicData),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const updateTopicService = async (id, topicData) => {
    return await UseFetchAPI({
        api: `${topicRoute}/${id}`,
        method: "PUT",
        body: JSON.stringify(topicData),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const deleteTopicService = async (ids) => {
    return await UseFetchAPI({
        api: `${topicRoute}`,
        method: "DELETE",
        body: JSON.stringify({ ids }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const getTotalTopicService = async (type = MediaType.None,
                                   topicType = TopicType.None) => {
    return await UseFetchAPI({
        api: `${topicRoute}/total`,
        params: {
            type, topicType
        }
    })
}

// Media operations for topics
const addImageToTopicService = async (topicId, imageData) => {
    const formData = new FormData();
    formData.append("topicId", topicId);
    formData.append("imageFile", imageData.imageFile);
    formData.append("capture", imageData.capture);

    return await UseFetchAPI({
        api: `${topicRoute}/image`,
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

const addVideoToTopicService = async (topicId, videoData) => {
    const formData = new FormData();
    formData.append("topicId", topicId);
    formData.append("videoFile", videoData.videoFile);
    formData.append("capture", videoData.capture);

    return await UseFetchAPI({
        api: `${topicRoute}/video`,
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

const updateTopicMediaService = async (mediaId, mediaData, mediaType = 'image') => {
    return await UseFetchAPI({
        api: `${topicRoute}/${mediaType}/${mediaId}`,
        method: "PUT",
        body: JSON.stringify(mediaData),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const deleteTopicMediaService = async (mediaIds, mediaType = 'image') => {
    return await UseFetchAPI({
        api: `${topicRoute}/${mediaType}`,
        method: "DELETE",
        body: JSON.stringify({ ids: mediaIds }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const getTopicImagesService = async (topicId) => {
    return await UseFetchAPI({
        api: `${topicRoute}/${topicId}/images`,
    })
}

const getTopicVideosService = async (topicId) => {
    return await UseFetchAPI({
        api: `${topicRoute}/${topicId}/videos`,
    })
}

// Create topic with media in one call
const createTopicWithMediaService = async (topicData) => {
    const formData = new FormData();
    formData.append("capture", topicData.capture);
    
    // Add images
    if (topicData.images && topicData.images.length > 0) {
        topicData.images.forEach((image, index) => {
            if (image.imageFile) {
                formData.append(`images[${index}].file`, image.imageFile);
                formData.append(`images[${index}].capture`, image.capture);
                formData.append(`images[${index}].description`, image.description || '');
            }
        });
    }
    
    // Add videos
    if (topicData.videos && topicData.videos.length > 0) {
        topicData.videos.forEach((video, index) => {
            if (video.videoFile) {
                formData.append(`videos[${index}].file`, video.videoFile);
                formData.append(`videos[${index}].capture`, video.capture);
                formData.append(`videos[${index}].description`, video.description || '');
            }
        });
    }

    return await UseFetchAPI({
        api: `${topicRoute}/with-media`,
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

// Delete specific image from topic
const deleteTopicImageService = async (topicId, imageId) => {
    return await UseFetchAPI({
        api: `${topicRoute}/${topicId}/image/${imageId}`,
        method: "DELETE"
    })
}

// Delete multiple images from topic
const deleteTopicImagesService = async (topicId, imageIds) => {
    return await UseFetchAPI({
        api: `${topicRoute}/${topicId}/images`,
        method: "DELETE",
        body: JSON.stringify({ ids: imageIds }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

// Delete specific video from topic
const deleteTopicVideoService = async (topicId, videoId) => {
    return await UseFetchAPI({
        api: `${topicRoute}/${topicId}/video/${videoId}`,
        method: "DELETE"
    })
}

// Delete multiple videos from topic
const deleteTopicVideosService = async (topicId, videoIds) => {
    return await UseFetchAPI({
        api: `${topicRoute}/${topicId}/videos`,
        method: "DELETE",
        body: JSON.stringify({ ids: videoIds }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const topicService = {
    // Topic CRUD
    getTopicListService,
    getTopicByIdService,
    createTopicService,
    updateTopicService,
    deleteTopicService,
    getTotalTopicService,
    
    // Media operations
    addImageToTopicService,
    addVideoToTopicService,
    updateTopicMediaService,
    deleteTopicMediaService,
    getTopicImagesService,
    getTopicVideosService,
    
    // Combined operations
    createTopicWithMediaService,
    deleteTopicImageService,
    deleteTopicImagesService,
    deleteTopicVideoService,
    deleteTopicVideosService
}