import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";

const musicRoute = "api/Music";

const getMusicListService = async (fetch, page, type = MediaType.None, keyword = "") => {
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