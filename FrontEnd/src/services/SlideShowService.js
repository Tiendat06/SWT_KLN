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
            ids,
            slideShowId
        })
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

const addSlideImageInSpecificSlideShowService = async (addedSlideImage,
                                                       type = MediaType.None,
                                                       slideShowType = SlideShowType.None) => {
    const formData = new FormData();
    formData.append("slideShowId", addedSlideImage.slideShowId);
    formData.append("mediaTypeId", type);
    formData.append("slideShowTypeId", slideShowType);
    formData.append("slideImage", addedSlideImage.imageFile);
    formData.append("capture", addedSlideImage.description);

    return await UseFetchAPI({
        api: `${slideShowRoute}/SlideImage`,
        method: "POST",
        body: formData,
        headers: null
    })
}


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


export const slideShowService = {
    getSlideShowByIdService,
    getSlideShowListService,
    deleteSlideImageInSpecificSlideShowService,
    deleteSlideImageInSpecificSlideShowBySlideShowIdService,
    getTotalSlideImageInSpecificSlideShowService,
    addSlideImageInSpecificSlideShowService
}


