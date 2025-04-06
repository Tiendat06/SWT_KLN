import {createContext, useContext} from "react";

const ManageImageContext = createContext();

export const ManageImageProvider = ({ children }) => {

    return (
        <ManageImageContext.Provider value={{
        }} >
            {children}
        </ManageImageContext.Provider>
    )
}

export const useManageImageContext = () => useContext(ManageImageContext);