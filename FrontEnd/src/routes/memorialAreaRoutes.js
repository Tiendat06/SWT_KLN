// import { element } from "prop-types";
import {
    MemorialArea,
    MemorialAreas,
    // MemorialStiltHouse,
    // MemorialTomb,
    // MemorialTemple,
    // Memorial15YearsPrison,
    MemorialArtifacts, MemorialExhibition,
    // MemorialBlogContent
} from "~/pages"

const memorialAreaJRoutes = [
    {path: "/memorial-areas", element: <MemorialAreas />},
    {path: "/memorial-artifact/:slideShowId", element: <MemorialArtifacts />},
    {path: "/memorial-exhibition/:slideShowId", element: <MemorialExhibition />},
]

const memorialAreaTRoutes = [
    {path: "/memorial-area", element: <MemorialArea />},
    // {path: "/memorial-area-stilt_house",element:<MemorialStiltHouse/>},
    // {path: "/memorial-area-tomb",element:<MemorialTomb/>},
    // {path: "/memorial-area-temple",element:<MemorialTemple/>},
    // {path: "/memorial-area-15years_prison",element:<Memorial15YearsPrison/>},


]

const memorialAreaRoutes = [
    ...memorialAreaJRoutes,
    ...memorialAreaTRoutes,
];

export { memorialAreaJRoutes,memorialAreaTRoutes };

export default memorialAreaRoutes;