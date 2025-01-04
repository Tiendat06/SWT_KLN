import {Handiwork} from "~/pages"

const handiworkJRoutes = [
    {path: "/handiwork", element: <Handiwork />},

]

const handiworkRoutes = [
    ...handiworkJRoutes,
];

export { handiworkJRoutes };

export default handiworkRoutes;