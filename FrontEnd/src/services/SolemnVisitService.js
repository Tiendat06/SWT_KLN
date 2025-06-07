import UseFetchAPI from "~/hooks/UseFetchAPI";

const solemnVisitRoute = 'api/SolemnVisit';
export const getSolemnVisitListService = async (fetch, page) => {
    return await UseFetchAPI({
        api: `${solemnVisitRoute}?Fetch=${fetch}&Page=${page}`,
    })
}