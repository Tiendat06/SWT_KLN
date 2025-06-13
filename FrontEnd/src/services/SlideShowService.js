import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";

export const getSlideShowByIdService = async (id) => {
    return await UseFetchAPI({
        api: `api/SlideShow/${id}`,
    })
}

export const getSlideShowListService = async (fetch, page,
                                              type = MediaType.None,
                                              slideShowType = SlideShowType.None,
                                              keyword = "") => {
    return await UseFetchAPI({
        api: `api/SlideShow?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}&SlideShowType=${slideShowType}`,
    })
}

export const deleteSlideImageInSpecificSlideShowService = async (ids, mediaType = MediaType.None, slideShowType = SlideShowType.None) => {
    return await UseFetchAPI({
        api: `api/SlideShow`,
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
        api: `api/SlideShow/total?Type=${type}&SlideShowType=${slideShowType}`,
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
        api: `api/SlideShow`,
        method: "PUT",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
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


