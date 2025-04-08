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
        api: `api/SlideShow?Fetch=${fetch}&Page=${page}&Type=${type}&Keyword=${keyword}&slideShowType=${slideShowType}`,
    })
}

export const deleteSlideImageInSpecificSlideShow = async (ids, mediaType, slideShowType) => {
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