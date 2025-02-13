import { element } from "prop-types";
import {About, AboutGenealogy, AboutBiography, AboutCreature, AboutBooksAndMagazines, AboutTopic, AboutMultimediaDocuments} from "~/pages"


const aboutJRoutes = [
    {path: "/about", element: <About />},
    {path: "/about-genealogy", element: <AboutGenealogy />},
    {path: "/about-biography", element: <AboutBiography />},
    {path: "/about-creature", element: <AboutCreature />},
    {path: "/about-booksandmagazines", element: <AboutBooksAndMagazines/>},
    {path: "/about-topic", element: <AboutTopic />},
    {path: "/about-multimediadocuments", element: <AboutMultimediaDocuments />},



]

const aboutRoutes = [
    ...aboutJRoutes,
];

export { aboutJRoutes };

export default aboutRoutes;