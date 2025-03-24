import Layouts from "~/layouts/Layouts";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import clsx from "clsx";
import {useAdminContext} from "~/context/AdminContext";

const App = () => {
    const {currentLocation} = useAdminContext();

    return (
        <>
            <div className={
                clsx(!currentLocation.startsWith('/administration') ?
                "app" :
                "admin-app"
            )}>
                <Layouts/>
            </div>
        </>
    );
}

export default App;
