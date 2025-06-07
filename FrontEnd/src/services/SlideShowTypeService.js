import UseFetchAPI from "~/hooks/UseFetchAPI";

const slideShowTypeRoute = 'api/SlideShowType';
export const getSlideShowTypeListService = async (fetch, page) => {
    return await UseFetchAPI({
        api: `${slideShowTypeRoute}?Fetch=${fetch}&Page=${page}`,
    })
}