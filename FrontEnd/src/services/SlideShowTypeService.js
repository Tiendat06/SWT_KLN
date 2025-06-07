import UseFetchAPI from "~/hooks/UseFetchAPI";

const slideShowTypeRoute = 'api/SlideShowType';

const getSlideShowTypeListService = async (fetch, page) => {
    return await UseFetchAPI({
        api: `${slideShowTypeRoute}`,
        params: {
            fetch, page
        }
    })
}

export const slideShowTypeService = {
    getSlideShowTypeListService
}