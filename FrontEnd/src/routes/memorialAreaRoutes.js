// import { element } from "prop-types";
import {MemorialArea,MemorialStiltHouse, MemorialTomb, MemorialTemple, Memorial15YearsPrison} from "~/pages"

const memorialAreaJRoutes = [
    {path: "/memorial-area", element: <MemorialArea />},
    {path: "/memorial-area-stilt_house",element:<MemorialStiltHouse/>},
    {path: "/memorial-area-tomb",element:<MemorialTomb/>},
    {path: "/memorial-area-temple",element:<MemorialTemple/>},
    {path: "/memorial-area-15years_prison",element:<Memorial15YearsPrison/>},


]

const memorialAreaRoutes = [
    ...memorialAreaJRoutes,
];

export { memorialAreaJRoutes };

export default memorialAreaRoutes;