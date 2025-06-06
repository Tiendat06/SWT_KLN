// import { element } from "prop-types";
import {
    MemorialArea,
    // MemorialStiltHouse,
    // MemorialTomb,
    // MemorialTemple,
    // Memorial15YearsPrison,
    MemorialArtifacts, MemorialExhibition, MemorialSolemnVisit,
    // MemorialBlogContent
} from "~/pages"

const memorialAreaJRoutes = [
    {path: "/memorial-artifact/:slideShowId", element: <MemorialArtifacts/>},
    {path: "/memorial-exhibition/:slideShowId", element: <MemorialExhibition/>},
    {path: "/memorial-solemn-visit", element: <MemorialSolemnVisit/>},
]

const memorialAreaTRoutes = [
    {path: "/memorial-area", element: <MemorialArea/>},
]

const memorialAreaRoutes = [
    ...memorialAreaJRoutes,
    ...memorialAreaTRoutes,
];

export {memorialAreaJRoutes, memorialAreaTRoutes};

export default memorialAreaRoutes;