import Layouts from "~/layouts/Layouts";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import clsx from "clsx";
import {useAdminContext} from "~/context/AdminContext";
import KLNToast from "./components/KLNToast/KLNToast";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const App = () => {
    const {currentLocation} = useAdminContext();

    return (
        <>
            <div className={
                clsx(!currentLocation.startsWith(AppRoutesEnum.AdminRoute) ?
                "app" :
                "admin-app"
            )}>
                <KLNToast />
                <Layouts/>
            </div>
        </>
    );
}

export default App;
