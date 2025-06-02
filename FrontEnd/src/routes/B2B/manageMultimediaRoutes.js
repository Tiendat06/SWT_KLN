import {CreateMultimediaImage, ManageMultimedia} from "~/pages";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const manageMultimediaJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-multimedia`, element: <ManageMultimedia/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-multimedia/create-image`, element: <CreateMultimediaImage/>},
];

const manageMultimediaRoutes = [
    ...manageMultimediaJRoutes,
];

export {manageMultimediaJRoutes};

export default manageMultimediaRoutes;