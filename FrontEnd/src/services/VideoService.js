import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const videoRoute = 'api/Video';

const getVideoListService = async (fetch, page, type = MediaType.None, keyword = "") => {
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