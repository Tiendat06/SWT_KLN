import {ManageTopic, TopicDetail, CreateTopic, EditTopic} from "~/pages";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const manageTopicJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-topic`, element: <ManageTopic/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-topic/create`, element: <CreateTopic/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-topic/:topicId/edit`, element: <EditTopic/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-topic/:topicId`, element: <TopicDetail/>},
];

const manageTopicRoutes = [
    ...manageTopicJRoutes,
];

export {manageTopicJRoutes};

export default manageTopicRoutes;