import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {ManageImage, CreateImage} from "~/pages";

const manageImagesJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-images`, element: <ManageImage/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-images/create-images`, element: <CreateImage/>},

];

const manageImagesRoutes = [
    ...manageImagesJRoutes,
];

export {manageImagesJRoutes};
export default manageImagesRoutes;