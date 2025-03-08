// import { element } from "prop-types";
import {
    MemorialArea,
    MemorialStiltHouse,
    MemorialTomb,
    MemorialTemple,
    Memorial15YearsPrison,
    MemorialArtifacts, MemorialExhibition
} from "~/pages"

const memorialAreaJRoutes = [
    {path: "/memorial-area", element: <MemorialArea />},
    {path: "/memorial-artifact", element: <MemorialArtifacts />},
    {path: "/memorial-exhibition", element: <MemorialExhibition />}
]

const memorialAreaTRoutes = [
    {path: "/memorial-area-stilt_house",element:<MemorialStiltHouse/>},
    {path: "/memorial-area-tomb",element:<MemorialTomb/>},
    {path: "/memorial-area-temple",element:<MemorialTemple/>},
    {path: "/memorial-area-15years_prison",element:<Memorial15YearsPrison/>},


]

const memorialAreaRoutes = [
    ...memorialAreaJRoutes,
    ...memorialAreaTRoutes,
];

export { memorialAreaJRoutes,memorialAreaTRoutes };

export default memorialAreaRoutes;