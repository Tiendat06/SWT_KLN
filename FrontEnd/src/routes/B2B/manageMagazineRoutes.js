import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {ManageMagazine} from "~/pages";

const manageMagazineJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-magazine`, element: <ManageMagazine/>},

];

const manageMagazineRoutes = [
    ...manageMagazineJRoutes,
];

export {manageMagazineJRoutes};
export default manageMagazineRoutes;