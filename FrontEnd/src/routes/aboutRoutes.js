import {About, AboutGenealogy, AboutBiography, AboutCreature} from "~/pages"

const aboutJRoutes = [
    {path: "/about", element: <About />},
    {path: "/about-genealogy", element: <AboutGenealogy />},
    {path: "/about-biography", element: <AboutBiography />},
    {path: "/about-creature", element: <AboutCreature />},
]

const aboutRoutes = [
    ...aboutJRoutes,
];

export { aboutJRoutes };

export default aboutRoutes;