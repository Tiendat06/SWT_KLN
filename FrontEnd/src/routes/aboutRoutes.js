// import { element } from "prop-types";
import { element } from "prop-types";
import {
    About,
    AboutGenealogy,
    AboutBiography,
    AboutCreature,
    AboutBooks_Magazines,
    AboutTopic,
    AboutMultimedia_Documents,
    AboutArt,
    AboutVideo, AboutMusic
} from "~/pages"


const aboutJRoutes = [
    // TDat Route
    {path: "/about", element: <About />},
    {path: "/about-creature", element: <AboutCreature />},
    {path: "/about-art/:slideShowId", element: <AboutArt />},
    {path: "/about-film", element: <AboutVideo />},
    {path: "/about-audio", element: <AboutMusic />},
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