import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import LoginPage from "~/pages/B2B/Login/Login";

const loginTRoutes = [
    {path: `${AppRoutesEnum.AdminRoute}/login`, element: <LoginPage/>},
];

const loginRoutes = [
    ...loginTRoutes,
];

export {loginTRoutes};
export default loginRoutes;