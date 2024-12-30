import {Route, Routes} from "react-router-dom";
import appRoutes from "./appRoutes";

function AppRoutes() {
    return (
        <Routes>
            {appRoutes?.map((route, index) => (
                <Route key={`appRoute-${index}`} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}

export default AppRoutes;