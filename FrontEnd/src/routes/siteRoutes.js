import {BlogContent, Home, ManageImage} from "~/pages"

const siteJRoutes = [
    {path: "/", element: <Home/>},
    {path: "/blog/:blogId", element: <BlogContent/>},
    {path: '/administration', element: <ManageImage/>},
];

const siteRoutes = [
    ...siteJRoutes,
];

export {siteJRoutes};

export default siteRoutes;