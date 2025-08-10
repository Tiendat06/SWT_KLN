import {CreateMultimedia, ManageMultimedia, UpdateMultimedia} from "~/pages";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
// import CreateVideo from "../../pages/B2B/ManageVideo/CreateVideo";

const multiMediaRoutes = '/manage-multimedia';
const manageMultimediaJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}${multiMediaRoutes}`, element: <ManageMultimedia/>},
    {path: `${AppRoutesEnum.AdminRoute}${multiMediaRoutes}/create-multimedia`, element: <CreateMultimedia/>},
    {path: `${AppRoutesEnum.AdminRoute}${multiMediaRoutes}/:id`, element: <UpdateMultimedia/>},
    // {path: `${AppRoutesEnum.AdminRoute}${multiMediaRoutes}/create-video`, element: <CreateVideo/>},
];

const manageMultimediaRoutes = [
    ...manageMultimediaJRoutes,
];

export {manageMultimediaJRoutes};

export default manageMultimediaRoutes;