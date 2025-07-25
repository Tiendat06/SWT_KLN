import {Header, Footer, Body, Sidebar, AdminHeader} from "~/components";
import {useAdminContext} from "~/context/AdminContext";
import clsx from "clsx";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

function Layouts() {
    const {currentLocation} = useAdminContext();

    if (currentLocation === `${AppRoutesEnum.AdminRoute}/login`) {
        return <Body />; 
    }
    return (
        <>
            {!currentLocation.startsWith(AppRoutesEnum.AdminRoute) ? (
                <>
                    <Header />
                    <Body />
                    <Footer />
                </>
            ): (
                <>
                    <div className="d-flex flex-wrap" style={{
                        minHeight: 900,
                    }}>
                        <div style={{
                            width: "20%",
                        }}>
                            <Sidebar />
                        </div>
                        <div style={{
                            width: "80%",
                        }} className={clsx('bg-light')}>
                            <AdminHeader />
                            <div className="p-4">
                                <Body />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    )
}

export default Layouts;