import {BreadCrumb} from "primereact/breadcrumb";
import {useEffect} from "react";

const KLNBreadCrumb
    = ({
           items = [],
           ...props
       }) => {

    useEffect(() => {
        document.querySelectorAll('.p-menuitem-separator').forEach((el) => {
            el.innerHTML = '/';
        });
    }, []);

    return (
        <>
            <BreadCrumb {...props} style={{
                backgroundColor: "transparent",
                border: "none",
                ...props.style
            }} model={items} className={`custom-breadcrumb ${props.className}`}/>
        </>
    )
}

export default KLNBreadCrumb;