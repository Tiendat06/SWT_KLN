import UseFetchAPI from "~/hooks/UseFetchAPI";

const solemnVisitRoute = 'api/SolemnVisit';

const getSolemnVisitListService = async (fetch, page) => {
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