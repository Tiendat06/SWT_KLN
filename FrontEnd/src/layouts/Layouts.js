import {Header, Footer, Body, Sidebar, AdminHeader} from "~/components";
import {useAdminContext} from "~/context/AdminContext";

function Layouts() {
    const {currentLocation} = useAdminContext();
    return (
        <>
            {!currentLocation.startsWith('/administration') ? (
                <>
                    <Header />
                    <Body />
                    <Footer />
                </>
            ): (
                <div className="d-flex flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-3">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9">
                        <AdminHeader />
                        <Body />
                    </div>
                </div>
            )}
        </>
    )
}

export default Layouts;