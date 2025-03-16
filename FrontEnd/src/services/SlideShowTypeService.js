import UseFetchAPI from "~/hooks/UseFetchAPI";

export const getSlideShowTypeListService = async (fetch, page) => {
    return await UseFetchAPI({
        api: `api/SlideShowType?Fetch=${fetch}&Page=${page}`,
    })
}