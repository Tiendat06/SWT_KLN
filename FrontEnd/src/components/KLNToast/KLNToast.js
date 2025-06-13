import {useAppContext} from "~/context/AppContext";
import {Toast} from "primereact/toast";
import React from "react";

const KLNToast = ({...props}) => {
    const {toast} = useAppContext();

    return (
        <>
            <Toast {...props} ref={toast}/>
        </>
    )
}

export default KLNToast;