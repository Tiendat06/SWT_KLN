import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {ManageMagazine, CreateBookAndMagazine, UpdateBookAndMagazine} from "~/pages";

const manageMagazineJRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-magazine`, element: <ManageMagazine/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-magazine/create-magazine`, element: <CreateBookAndMagazine/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-magazine/:id`, element: <UpdateBookAndMagazine/>},

];

const manageMagazineRoutes = [
    ...manageMagazineJRoutes,
];

export {manageMagazineJRoutes};
export default manageMagazineRoutes;