import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";

const slideShowRoute = 'api/SlideShow';
export const getSlideShowByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/${id}`,
    })
}

export const getSlideShowListService = async (fetch, page,
                                              type = MediaType.None,
                                              slideShowType = SlideShowType.None,
                                              keyword = "") => {
    return await UseFetchAPI({
        api: `${slideShowRoute}?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}&SlideShowType=${slideShowType}`,
    })
}

export const deleteSlideImageInSpecificSlideShowService = async (ids, mediaType = MediaType.None, slideShowType = SlideShowType.None) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}`,
        method: "DELETE",
        body: JSON.stringify({
            ids,
            mediaType,
            slideShowType
        })
    });
}

export const getTotalSlideImageInSpecificSlideShowService = async (type = MediaType.None, slideShowType = SlideShowType.None) => {
    return await UseFetchAPI({
        api: `${slideShowRoute}/total?Type=${type}&SlideShowType=${slideShowType}`,
    });
}

export const addSlideImageInSpecificSlideShowService = async (addedSlideImage,
                                                              type = MediaType.None,
                                                              slideShowType = SlideShowType.None) => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("slideShowType", slideShowType);
    formData.append("imageFile", addedSlideImage.imageFile);
    formData.append("capture", addedSlideImage.description);

    return await UseFetchAPI({
        api: `${slideShowRoute}`,
        method: "PUT",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

