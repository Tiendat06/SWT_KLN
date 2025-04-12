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

