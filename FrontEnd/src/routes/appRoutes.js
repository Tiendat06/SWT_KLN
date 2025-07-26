import siteRoutes, {siteJRoutes} from "./siteRoutes";
import aboutRoutes, {aboutJRoutes} from "./B2C/aboutRoutes";
import memorialAreaRoutes, {memorialAreaJRoutes} from "./B2C/memorialAreaRoutes";
import handiworkRoutes, {handiworkJRoutes} from "./B2C/handiworkRoutes";
import manageMultimediaRoutes, {manageMultimediaJRoutes} from "~/routes/B2B/manageMultimediaRoutes";
import manageImagesRoutes, {manageImagesJRoutes} from "~/routes/B2B/manageImagesRoutes";
import manageTopicRoutes, {manageTopicJRoutes} from "~/routes/B2B/manageTopicRoutes";
import loginRoutes, { loginTRoutes } from "~/routes/B2B/loginRoutes";
import manageMagazineRoutes, {manageMagazineJRoutes} from "~/routes/B2B/manageMagazineRoutes";
import manageSlideShowRoutes, {manageSlideShowKRoutes} from "~/routes/B2B/manageSlideshowRoutes";


export {siteJRoutes, aboutJRoutes, memorialAreaJRoutes, handiworkJRoutes};

export {manageMultimediaJRoutes, manageImagesJRoutes, manageMagazineJRoutes, manageTopicJRoutes};

export {loginTRoutes};

export {manageSlideShowKRoutes};


const appRoutes = [
    ...siteRoutes,
    ...aboutRoutes,
    ...memorialAreaRoutes,
    ...handiworkRoutes,
    ...manageMultimediaRoutes,
    ...manageMagazineRoutes,
    ...manageImagesRoutes,
    ...manageTopicRoutes,
    ...loginRoutes,
    ...manageSlideShowRoutes,
];

export default appRoutes;