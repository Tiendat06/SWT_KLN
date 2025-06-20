import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const videoRoute = 'api/Video';

const getVideoListService = async (fetch = DEFAULT_FETCH,
                                   page = DEFAULT_PAGE,
                                   type = MediaType.None,
                                   keyword = "") => {
    return await UseFetchAPI({
        api: `${videoRoute}`,
        params: {
            fetch, page, type, keyword
        }
    })
}

const getVideoByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${videoRoute}/${id}`,
    })
}

const getTotalVideoService = async (type = MediaType.None) => {
    return await UseFetchAPI({
        api: `${videoRoute}/total`,
        params: {
            type
        }
    })
}

export const videoService = {
    getVideoListService,
    getVideoByIdService,
    getTotalVideoService
}