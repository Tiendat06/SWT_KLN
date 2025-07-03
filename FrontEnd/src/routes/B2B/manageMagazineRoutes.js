import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {ManageMagazine, CreateBookAndMagazine} from "~/pages";

const manageMagazineJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-magazine`, element: <ManageMagazine/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-magazine/create-magazine`, element: <CreateBookAndMagazine/>},

];

const manageMagazineRoutes = [
    ...manageMagazineJRoutes,
];

export {manageMagazineJRoutes};
export default manageMagazineRoutes;