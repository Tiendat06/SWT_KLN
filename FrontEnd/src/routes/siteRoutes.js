import { BlogContent, Home } from "~/pages"
import EditMedia from '~/pages/B2B/ManageMultimedia/EditMultimedia';

const siteJRoutes = [
    { path: "/", element: <Home /> },
    { path: "/blog/:blogId", element: <BlogContent /> },
];

const siteTRoutes = [
    { path: "/administration/manage-multimedia/:type/:id", element: <EditMedia /> }
]

const siteRoutes = [
    ...siteJRoutes,
    ...siteTRoutes,
];

export { siteJRoutes, siteTRoutes };

export default siteRoutes;


