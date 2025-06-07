import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import TopicType from "~/enum/Topic/TopicType";

const topicRoute = 'api/Topic';
export const getTopicListService = async (fetch, page,
                                          type = MediaType.None,
                                          topicType = TopicType.None,
                                          keyword = "") => {
    return UseFetchAPI({
        api: `${topicRoute}?Fetch=${fetch}&Page=${page}&Type=${type}&TopicType=${topicType}&Keyword=${keyword}`
    })
}

export const getTopicByIdService = async (id) => {
    return UseFetchAPI({
        api: `${topicRoute}/${id}`,
    })
}