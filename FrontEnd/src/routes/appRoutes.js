import siteRoutes from "./siteRoutes";
import aboutRoutes from "./aboutRoutes";
import memorialAreaRoutes from "./memorialAreaRoutes";
import handiworkRoutes from "./handiworkRoutes";

export {siteRoutes, aboutRoutes, memorialAreaRoutes, handiworkRoutes};

const appRoutes = [
    ...siteRoutes,
    ...aboutRoutes,
    ...memorialAreaRoutes,
    ...handiworkRoutes
];

export default appRoutes;