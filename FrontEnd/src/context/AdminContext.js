import {createContext, useContext, useEffect, useLayoutEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const currentPath = useLocation().pathname;
    const [currentLocation, setCurrentLocation] = useState(currentPath);
    const [sideBarCategory, setSideBarCategory] = useState(Number(localStorage.getItem('sideBarCategory')) || 1);

    useLayoutEffect(() => {
        localStorage.setItem('sideBarCategory', Number(sideBarCategory));
    }, [sideBarCategory]);

    useEffect(() => {
        setCurrentLocation(currentPath);
    }, [currentPath]);

    return (
        <AdminContext.Provider value={{
            currentLocation,
            sideBarCategory, setSideBarCategory
        }} >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext);