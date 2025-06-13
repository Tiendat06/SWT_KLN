import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const musicRoute = "api/Music";

const getMusicListService = async (fetch = DEFAULT_FETCH,
                                   page = DEFAULT_PAGE,
                                   type = MediaType.None,
                                   keyword = "") => {
    return await UseFetchAPI({
        api: `${musicRoute}`,
        params: {
            fetch, page, type, keyword,
        }
    })
}

const getMusicByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${musicRoute}/${id}`,
    })
}

const getTotalMusicService = async (type = MediaType.None) => {
    return await UseFetchAPI({
        api: `${musicRoute}/total`,
        params: {
            type
        }
    })
}

export const musicService = {
    getMusicListService,
    getMusicByIdService,
    getTotalMusicService
}