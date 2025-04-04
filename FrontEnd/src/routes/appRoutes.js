import siteRoutes, {siteJRoutes} from "./siteRoutes";
import aboutRoutes, {aboutJRoutes} from "./B2C/aboutRoutes";
import memorialAreaRoutes, {memorialAreaJRoutes} from "./B2C/memorialAreaRoutes";
import handiworkRoutes, {handiworkJRoutes} from "./B2C/handiworkRoutes";
import manageMultimediaRoutes, {manageMultimediaJRoutes} from "~/routes/B2B/manageMultimediaRoutes";
import manageImagesRoutes, {manageImagesJRoutes} from "~/routes/B2B/manageImagesRoutes";
import loginRoutes, { loginTRoutes } from "~/routes/B2B/loginRoutes"; 


export {siteJRoutes, aboutJRoutes, memorialAreaJRoutes, handiworkJRoutes};

export {manageMultimediaJRoutes, manageImagesJRoutes};

export {loginTRoutes};

const appRoutes = [
    ...siteRoutes,
    ...aboutRoutes,
    ...memorialAreaRoutes,
    ...handiworkRoutes,
    ...manageMultimediaRoutes,
    ...manageImagesRoutes,
    ...loginRoutes 
];

export default appRoutes;