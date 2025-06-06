import {BreadCrumb} from "primereact/breadcrumb";
import {useEffect} from "react";

const KLNBreadCrumb
    = ({
           items = [],
       }) => {

    useEffect(() => {
        document.querySelectorAll('.p-menuitem-separator').forEach((el) => {
            el.innerHTML = '/';
        });
    }, []);

    return (
        <>
            <BreadCrumb style={{
                backgroundColor: "transparent",
                border: "none",
            }} model={items} className="custom-breadcrumb" />
        </>
    )
}

export default KLNBreadCrumb;