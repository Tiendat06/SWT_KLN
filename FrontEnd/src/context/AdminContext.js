import {createContext, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const currentPath = useLocation().pathname;
    const [currentLocation, setCurrentLocation] = useState(currentPath);

    useEffect(() => {
        setCurrentLocation(currentPath);
    }, [currentPath]);

    return (
        <AdminContext.Provider value={{
            currentLocation
        }} >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext);