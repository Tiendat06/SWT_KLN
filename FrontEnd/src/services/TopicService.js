import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import TopicType from "~/enum/Topic/TopicType";

const topicRoute = 'api/Topic';

const getTopicListService = async (fetch,
                                   page,
                                   type = MediaType.None,
                                   topicType = TopicType.None,
                                   keyword = "") => {
    return UseFetchAPI({
        api: `${topicRoute}`,
        params: {
            fetch, page, type, keyword, topicType
        }
    })
}

const getTopicByIdService = async (id) => {
    return UseFetchAPI({
        api: `${topicRoute}/${id}`,
    })
}

export const topicService = {
    getTopicListService,
    getTopicByIdService
}