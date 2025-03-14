import {BlogContent, Home} from "~/pages"

const siteJRoutes = [
    {path: "/", element: <Home />},
    {path: "/blog/:blogId", element: <BlogContent />},
]

const siteRoutes = [
    ...siteJRoutes,
];

export { siteJRoutes };

export default siteRoutes;