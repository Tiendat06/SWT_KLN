import {MemorialArea} from "~/pages"

const memorialAreaJRoutes = [
    {path: "/memorial-area", element: <MemorialArea />},

]

const memorialAreaRoutes = [
    ...memorialAreaJRoutes,
];

export { memorialAreaJRoutes };

export default memorialAreaRoutes;