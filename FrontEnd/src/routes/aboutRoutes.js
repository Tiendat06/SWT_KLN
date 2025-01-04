import {About, AboutGenealogy, AboutBiography} from "~/pages"

const aboutJRoutes = [
    {path: "/about", element: <About />},
    {path: "/about-genealogy", element: <AboutGenealogy />},
    {path: "/about-biography", element: <AboutBiography />},
]

const aboutRoutes = [
    ...aboutJRoutes,
];

export { aboutJRoutes };

export default aboutRoutes;