import siteRoutes, {siteJRoutes} from "./siteRoutes";
import aboutRoutes, {aboutJRoutes} from "./B2C/aboutRoutes";
import memorialAreaRoutes, {memorialAreaJRoutes} from "./B2C/memorialAreaRoutes";
import handiworkRoutes, {handiworkJRoutes} from "./B2C/handiworkRoutes";

export {siteJRoutes, aboutJRoutes, memorialAreaJRoutes, handiworkJRoutes};

const appRoutes = [
    ...siteRoutes,
    ...aboutRoutes,
    ...memorialAreaRoutes,
    ...handiworkRoutes
];

export default appRoutes;