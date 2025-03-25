import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {ManageTopic} from "~/pages";

const manageTopicJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-topic`, element: <ManageTopic/>},

];

const manageTopicRoutes = [
    ...manageTopicJRoutes,
];

export {manageTopicJRoutes};
export default manageTopicRoutes;