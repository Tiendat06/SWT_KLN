import { ManageBlog, CreateBlog, EditBlog } from "~/pages";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const manageBlogKRoutes = [
    { path: `${AppRoutesEnum.AdminRoute}/manage-blog`, element: <ManageBlog /> },
    { path: `${AppRoutesEnum.AdminRoute}/manage-blog/create`, element: <CreateBlog /> },
    { path: `${AppRoutesEnum.AdminRoute}/manage-blog/:blogId/edit`, element: <EditBlog /> },
];

const manageBlogRoutes = [
    ...manageBlogKRoutes,
];

export { manageBlogKRoutes };

export default manageBlogRoutes; 