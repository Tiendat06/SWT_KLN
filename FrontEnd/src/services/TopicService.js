import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import TopicType from "~/enum/Topic/TopicType";
import {DEFAULT_FETCH, DEFAULT_PAGE} from "~/utils/Constansts";

const topicRoute = 'api/Topic';

const getTopicListService = async (fetch = DEFAULT_FETCH,
                                   page = DEFAULT_PAGE,
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