import UseFetchAPI from "~/hooks/UseFetchAPI";
import {book_home_1} from "~/assets/img";

export const getTestData = async (count) => {
    return await UseFetchAPI({
        api: 'api/User/v1',
    });
}

export const getBlogListData = async (fetch, page) => {
    return await UseFetchAPI({
        api: `api/Blog?Fetch=${fetch}&Page=${page}`,
    });
}

export const getMagazineListData = async (fetch, page) => {
    return await UseFetchAPI({
        api: `api/Magazine?Fetch=${fetch}&Page=${page}`,
    });
}