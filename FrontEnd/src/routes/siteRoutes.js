import {BlogContent, Home, ManageImage, LoginPage} from "~/pages"

const siteJRoutes = [
    {path: "/", element: <Home/>},
    {path: "/blog/:blogId", element: <BlogContent/>},
    // {path: '/administration', element: <ManageImage/>},
    // { path: "/administration/login", element: <LoginPage /> },
];

const siteRoutes = [
    ...siteJRoutes,
];

export {siteJRoutes};

export default siteRoutes;