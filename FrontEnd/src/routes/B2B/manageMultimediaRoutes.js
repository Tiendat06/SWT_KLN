import {ManageMultimedia} from "~/pages";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const manageMultimediaJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-multimedia`, element: <ManageMultimedia/>},
];

const manageMultimediaRoutes = [
    ...manageMultimediaJRoutes,
];

export {manageMultimediaJRoutes};

export default manageMultimediaRoutes;