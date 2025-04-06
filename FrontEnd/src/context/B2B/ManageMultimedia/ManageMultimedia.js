import {createContext, useContext, useState} from "react";

const ManageMultimediaContext = createContext();

export const ManageMultimediaProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <ManageMultimediaContext.Provider value={{
            visible, setVisible
        }} >
            {children}
        </ManageMultimediaContext.Provider>
    )
}

export const useManageMultimediaContext = () => useContext(ManageMultimediaContext);