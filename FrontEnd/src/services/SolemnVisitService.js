import UseFetchAPI from "~/hooks/UseFetchAPI";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const solemnVisitRoute = 'api/SolemnVisit';

const getSolemnVisitListService = async (fetch = DEFAULT_FETCH,
                                         page = DEFAULT_PAGE) => {
    return await UseFetchAPI({
        api: `${solemnVisitRoute}`,
        params: {
            fetch, page
        }
    })
}

export const solemnVisitService = {
    getSolemnVisitListService
}