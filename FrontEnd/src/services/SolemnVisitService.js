import UseFetchAPI from "~/hooks/UseFetchAPI";

export const getSolemnVisitListService = async (fetch, page) => {
    return await UseFetchAPI({
        api: `api/SolemnVisit?Fetch=${fetch}&Page=${page}`,
    })
}