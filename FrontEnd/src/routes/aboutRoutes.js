import { element } from "prop-types";
import {About, AboutGenealogy, AboutBiography, AboutCreature, AboutBooks_Magazines, AboutTopic, AboutMultimedia_Documents} from "~/pages"


const aboutJRoutes = [
    {path: "/about", element: <About />},
    {path: "/about-genealogy", element: <AboutGenealogy />},
    {path: "/about-biography", element: <AboutBiography />},
    {path: "/about-creature", element: <AboutCreature />},
    {path: "/about-books-magazines", element: <AboutBooks_Magazines/>},
    {path: "/about-topic", element: <AboutTopic />},
    {path: "/about-multimedia-documents", element: <AboutMultimedia_Documents />},



]
const aboutTRoutes = [
    {path: "/about-genealogy", element: <AboutGenealogy />},
    {path: "/about-biography", element: <AboutBiography />},
    {path: "/about-creature", element: <AboutCreature />},
    {path: "/about-books-magazines", element: <AboutBooks_Magazines/>},
    {path: "/about-topic", element: <AboutTopic />},
    {path: "/about-multimedia-documents", element: <AboutMultimedia_Documents />},



]


const aboutRoutes = [
    ...aboutJRoutes,
    ...aboutTRoutes,
];

export { aboutJRoutes, aboutTRoutes };

export default aboutRoutes;