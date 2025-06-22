import {BreadCrumb} from "primereact/breadcrumb";
import styles from "~/styles/Components/KLNBreadCrumb/klnBreadCrumb.module.scss";

const KLNBreadCrumb
    = ({
           items = [],
           ...props
       }) => {

    return (
        <>
            <BreadCrumb
                {...props}
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                    ...props.style
                }}
                model={items}
                className={`custom-breadcrumb ${props.className}`}/>
        </>
    )
}

export default KLNBreadCrumb;