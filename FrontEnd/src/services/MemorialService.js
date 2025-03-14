import UseFetchAPI from "~/hooks/UseFetchAPI";

export const getBlogByIdService = async (id) => {
    return await UseFetchAPI({
        api: `api/Blog/${id}`,
    });
}

export const getBlogByNameService = async (name) => {
    return await UseFetchAPI({
        api: `api/Blog/${name}`,
    })
}

export const getBlogListService = async (fetch, page, type = 0) => {
    return await UseFetchAPI({
        api: `api/Blog?Fetch=${fetch}&Page=${page}&Type=${type}`,
    })
}

export const getSlideShowListService = async (fetch, page, type = 0) => {
    return await UseFetchAPI({
        api: `api/SlideShow?Fetch=${fetch}&Page=${page}&Type=${type}`,
    })
}

export const getSlideShowByIdService = async (id) => {
    return await UseFetchAPI({
        api: `api/SlideShow/${id}`,
    })
}