import {Handiwork} from "~/pages"

const handiworkJRoutes = [
    {path: "/handiwork/:blogId", element: <Handiwork />},

]

const handiworkRoutes = [
    ...handiworkJRoutes,
];

export { handiworkJRoutes };

export default handiworkRoutes;