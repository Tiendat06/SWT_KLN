import siteRoutes, {siteJRoutes} from "./siteRoutes";
import aboutRoutes, {aboutJRoutes} from "./aboutRoutes";
import memorialAreaRoutes, {memorialAreaJRoutes} from "./memorialAreaRoutes";
import handiworkRoutes, {handiworkJRoutes} from "./handiworkRoutes";

export {siteJRoutes, aboutJRoutes, memorialAreaJRoutes, handiworkJRoutes};

const appRoutes = [
    ...siteRoutes,
    ...aboutRoutes,
    ...memorialAreaRoutes,
    ...handiworkRoutes
];

export default appRoutes;