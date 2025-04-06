import {BreadCrumb} from "primereact/breadcrumb";
import {useEffect} from "react";
// import { Fo } from '@fortawesome/free-solid-svg-icons'
// import { faSlashForward } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


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