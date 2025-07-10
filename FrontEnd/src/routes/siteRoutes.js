import {BlogContent, Home, ManageImage, LoginPage, ManageVideo} from "~/pages"
import CreateVideo from "~/pages/B2B/ManageVideo/CreateVideo"; 
import EditMedia from '~/pages/B2B/ManageMultimedia/EditMultimedia';


// import {BlogContent, Home} from "~/pages"



const siteJRoutes = [
    {path: "/", element: <Home/>},
    {path: "/blog/:blogId", element: <BlogContent/>},
    // {path: '/administration', element: <ManageImage/>},
    // { path: "/administration/login", element: <LoginPage /> },
];

const siteTRoutes = [
      { path: "/administration/manage-video", element: <ManageVideo /> }, 
      { path: "/administration/manage-multimedia/create-video", element: <CreateVideo /> },
     { path: "/administration/manage-multimedia/:type/:id", element: <EditMedia /> }


]

const siteRoutes = [
    ...siteJRoutes,
    ...siteTRoutes,
];

export {siteJRoutes, siteTRoutes};

export default siteRoutes;


