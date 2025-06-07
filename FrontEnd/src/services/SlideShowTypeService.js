import UseFetchAPI from "~/hooks/UseFetchAPI";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const slideShowTypeRoute = 'api/SlideShowType';

const getSlideShowTypeListService = async (fetch = DEFAULT_FETCH,
                                           page = DEFAULT_PAGE) => {
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