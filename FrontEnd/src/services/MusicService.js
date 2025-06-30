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

const addMusicService = async (addedMusic) => {
    const formData = new FormData();
    formData.append("title", addedMusic.title);
    formData.append("mediaTypeId", addedMusic.type);
    formData.append("author", addedMusic.author);
    formData.append("imageLink", addedMusic.imageFile);
    formData.append("audioLink", addedMusic.audioFile);
    formData.append("userId", addedMusic.userId);

    return await UseFetchAPI({
        api: `${musicRoute}/Music`,
        body: formData,
        method: "POST",
    })
}

export const musicService = {
    getMusicListService,
    getMusicByIdService,
    getTotalMusicService,
    addMusicService
}