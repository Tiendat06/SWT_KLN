import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import TopicType from "~/enum/Topic/TopicType";
import {DEFAULT_FETCH, DEFAULT_PAGE, TEST_USER_ID} from "~/utils/Constansts";

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

const createTopicService = async (topicData = {}) => {
    const formData = new FormData();
    if (topicData.capture !== undefined) formData.append("Capture", topicData.capture);
    if (topicData.description !== undefined) formData.append("Description", topicData.description || "");
    formData.append("MediaTypeId", topicData.mediaTypeId != null ? topicData.mediaTypeId : MediaType.None);
    formData.append("UserId", topicData.userId || TEST_USER_ID);

    const topicMedia = Array.isArray(topicData.topicMedia) ? topicData.topicMedia : [];
    const images = Array.isArray(topicData.images) ? topicData.images : [];
    const videos = Array.isArray(topicData.videos) ? topicData.videos : [];

    let index = 0;
    topicMedia.forEach((m) => {
        if (m && m.mediaFile) {
            formData.append(`TopicMedia[${index}].Capture`, m.capture || "");
            formData.append(`TopicMedia[${index}].MediaLink`, m.mediaFile);
            index += 1;
        }
    });
    images.forEach((img) => {
        if (img && img.imageFile) {
            formData.append(`TopicMedia[${index}].Capture`, img.capture || "");
            formData.append(`TopicMedia[${index}].MediaLink`, img.imageFile);
            index += 1;
        }
    });
    videos.forEach((vid) => {
        if (vid && vid.videoFile) {
            formData.append(`TopicMedia[${index}].Capture`, vid.capture || "");
            formData.append(`TopicMedia[${index}].MediaLink`, vid.videoFile);
            index += 1;
        }
    });

    return await UseFetchAPI({
        api: `${topicRoute}`,
        method: "POST",
        body: formData,
        headers: {}
    })
}

const updateTopicService = async (id, topicData = {}) => {
    const formData = new FormData();
    if (topicData.capture !== undefined) formData.append("Capture", topicData.capture);
    if (topicData.description !== undefined) formData.append("Description", topicData.description || "");
    formData.append("MediaTypeId", topicData.mediaTypeId != null ? topicData.mediaTypeId : MediaType.None);
    formData.append("UserId", topicData.userId || TEST_USER_ID);

    const topicMedia = Array.isArray(topicData.topicMedia) ? topicData.topicMedia : [];
    const images = Array.isArray(topicData.images) ? topicData.images : [];
    const videos = Array.isArray(topicData.videos) ? topicData.videos : [];

    let index = 0;
    topicMedia.forEach((m) => {
        if (m && (m.mediaFile || m.MediaLink)) {
            formData.append(`TopicMedia[${index}].Capture`, m.capture || "");
            const file = m.mediaFile || m.MediaLink;
            if (file) formData.append(`TopicMedia[${index}].MediaLink`, file);
            index += 1;
        }
    });
    images.forEach((img) => {
        if (img && (img.imageFile || img.ImageLink)) {
            formData.append(`TopicMedia[${index}].Capture`, img.capture || "");
            const file = img.imageFile || img.ImageLink;
            if (file) formData.append(`TopicMedia[${index}].MediaLink`, file);
            index += 1;
        }
    });
    videos.forEach((vid) => {
        if (vid && (vid.videoFile || vid.VideoLink)) {
            formData.append(`TopicMedia[${index}].Capture`, vid.capture || "");
            const file = vid.videoFile || vid.VideoLink;
            if (file) formData.append(`TopicMedia[${index}].MediaLink`, file);
            index += 1;
        }
    });

    return await UseFetchAPI({
        api: `${topicRoute}/${id}`,
        method: "PUT",
        body: formData,
        headers: {}
    })
}

const deleteTopicService = async (ids) => {
    const formData = new FormData();
    
    ids.forEach((id, index) => {
        formData.append(`ids[${index}]`, id);
    });

    return await UseFetchAPI({
        api: `${topicRoute}/ids`,
        method: "DELETE",
        body: formData,
        headers: {}
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

const addTopicMediaService = async ({ topicId, mediaTypeId = MediaType.None, userId = TEST_USER_ID, images = [], videos = [] }) => {
    const formData = new FormData();
    if (topicId) formData.append("TopicId", topicId);
    formData.append("MediaTypeId", mediaTypeId);
    formData.append("UserId", userId);

    images.forEach((img, index) => {
        formData.append(`TopicImages[${index}].Id`, img.id != null ? img.id : 0);
        formData.append(`TopicImages[${index}].Capture`, img.capture || "");
        if (img.imageFile) formData.append(`TopicImages[${index}].ImageLink`, img.imageFile);
    });
    videos.forEach((vid, index) => {
        formData.append(`TopicVideos[${index}].Id`, vid.id != null ? vid.id : 0);
        formData.append(`TopicVideos[${index}].Capture`, vid.capture || "");
        if (vid.videoFile) formData.append(`TopicVideos[${index}].VideoLink`, vid.videoFile);
    });

    return await UseFetchAPI({
        api: `${topicRoute}/Media`,
        method: "POST",
        body: formData,
        headers: {}
    });
}

const updateTopicMediaService = async ({ topicId = null, mediaTypeId = MediaType.None, userId = TEST_USER_ID, images = [], videos = [] }) => {
    const formData = new FormData();
    if (topicId) formData.append("TopicId", topicId);
    formData.append("MediaTypeId", mediaTypeId);
    formData.append("UserId", userId);

    images.forEach((img, index) => {
        if (img.id != null) formData.append(`TopicImages[${index}].Id`, img.id);
        if (img.capture !== undefined) formData.append(`TopicImages[${index}].Capture`, img.capture || "");
        if (img.imageFile) formData.append(`TopicImages[${index}].ImageLink`, img.imageFile);
    });
    videos.forEach((vid, index) => {
        if (vid.id != null) formData.append(`TopicVideos[${index}].Id`, vid.id);
        if (vid.capture !== undefined) formData.append(`TopicVideos[${index}].Capture`, vid.capture || "");
        if (vid.videoFile) formData.append(`TopicVideos[${index}].VideoLink`, vid.videoFile);
    });

    return await UseFetchAPI({
        api: `${topicRoute}/Media`,
        method: "PUT",
        body: formData,
        headers: {}
    })
}

const deleteTopicMediaService = async ({ topicId, mediaTypeId = MediaType.None, userId = TEST_USER_ID, imageIds = [], videoIds = [] }) => {
    const formData = new FormData();
    if (topicId) formData.append("TopicId", topicId);
    formData.append("MediaTypeId", mediaTypeId);
    formData.append("UserId", userId);
    
    imageIds.forEach((id, index) => {
        formData.append(`ImageIds[${index}]`, id);
    });
    videoIds.forEach((id, index) => {
        formData.append(`VideoIds[${index}]`, id);
    });

    return await UseFetchAPI({
        api: `${topicRoute}/Media`,
        method: "DELETE",
        body: formData,
        headers: {}
    })
}

const updateImageService = async ({ id, capture, imageFile, topicId = null, mediaTypeId = MediaType.None, userId = TEST_USER_ID }) => {
    return updateTopicMediaService({ topicId, mediaTypeId, userId, images: [ { id, capture, imageFile } ] });
}

const updateVideoService = async ({ id, capture, videoFile, topicId = null, mediaTypeId = MediaType.None, userId = TEST_USER_ID }) => {
    return updateTopicMediaService({ topicId, mediaTypeId, userId, videos: [ { id, capture, videoFile } ] });
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
    addTopicMediaService,
    updateTopicMediaService,
    deleteTopicMediaService,
    updateImageService,
    updateVideoService,
};