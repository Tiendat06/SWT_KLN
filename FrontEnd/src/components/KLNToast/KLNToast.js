import {useAppContext} from "~/context/AppContext";
import {Toast} from "primereact/toast";
import React from "react";

const KLNToast = () => {
    const {toast} = useAppContext();

    return (
        <>
            <Toast ref={toast} />
        </>
    )
}

export default KLNToast;