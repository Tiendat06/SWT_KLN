import {BlogContent, Home} from "~/pages"
// import CreateVideo from "~/pages/B2B/ManageVideo/CreateVideo";

// import {BlogContent, Home} from "~/pages"

const siteJRoutes = [
    {path: "/", element: <Home/>},
    {path: "/blog/:blogId", element: <BlogContent/>},
];

const siteTRoutes = [
    // {path: "/administration/manage-video", element: <ManageVideo />},
    // {path: "/administration/manage-multimedia/create-video", element: <CreateVideo/>},
]

const siteRoutes = [
    ...siteJRoutes,
    ...siteTRoutes,
];

export {siteJRoutes, siteTRoutes};

export default siteRoutes;


