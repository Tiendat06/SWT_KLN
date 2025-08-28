import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {ManageSolemnVisit, CreateSolemnVisit, EditSolemnVisit} from "~/pages";

const manageSolemnVisitRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-solemn-visit`, element: <ManageSolemnVisit />},
    {path: `${AppRoutesEnum.AdminRoute}/manage-solemn-visit/create`, element: <CreateSolemnVisit />},
    {path: `${AppRoutesEnum.AdminRoute}/manage-solemn-visit/:solemnVisitId/edit`, element: <EditSolemnVisit />}
];

export const manageSolemnVisitKRoutes = manageSolemnVisitRoutes;

export default manageSolemnVisitRoutes;
