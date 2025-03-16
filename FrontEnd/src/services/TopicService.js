import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import TopicType from "~/enum/Topic/TopicType";

export const getTopicListService = async (fetch, page,
                                          type = MediaType.None,
                                          topicType = TopicType.None,
                                          keyword = "") => {
    return UseFetchAPI({
        api: `api/Topic?Fetch=${fetch}&Page=${page}&Type=${type}&TopicType=${topicType}&Keyword=${keyword}`
    })
}

export const getTopicByIdService = async (id) => {
    return UseFetchAPI({
        api: `api/Topic/${id}`,
    })
}