import {Home} from "~/pages"

const siteJRoutes = [
    {path: "/", element: <Home />},

]

const siteRoutes = [
    ...siteJRoutes,
];

export { siteJRoutes };

export default siteRoutes;