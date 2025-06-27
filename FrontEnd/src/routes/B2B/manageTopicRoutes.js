import {ManageTopic, TopicDetail} from "~/pages";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const manageTopicJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-topic`, element: <ManageTopic/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-topic/:topicId`, element: <TopicDetail/>},
];

const manageTopicRoutes = [
    ...manageTopicJRoutes,
];

export {manageTopicJRoutes};

export default manageTopicRoutes;