import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {ManageImage} from "~/pages";

const manageImagesJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-images`, element: <ManageImage/>},

];

const manageImagesRoutes = [
    ...manageImagesJRoutes,
];

export {manageImagesJRoutes};
export default manageImagesRoutes;