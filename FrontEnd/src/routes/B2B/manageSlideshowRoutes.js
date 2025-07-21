import {ManageSlideShow, CreateSlideShow, EditSlideShow, SlideShowDetail} from "~/pages";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const manageSlideShowKRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/manage-exhibition`, element: <ManageSlideShow/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-exhibition/create`, element: <CreateSlideShow/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-exhibition/:slideShowId/edit`, element: <EditSlideShow/>},
    {path: `${AppRoutesEnum.AdminRoute}/manage-exhibition/:slideShowId`, element: <SlideShowDetail/>},
];

const manageSlideShowRoutes = [
    ...manageSlideShowKRoutes,
];

export {manageSlideShowKRoutes};

export default manageSlideShowRoutes; 