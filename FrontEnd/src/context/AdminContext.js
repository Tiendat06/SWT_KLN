import {createContext, useContext, useEffect, useLayoutEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const currentPath = useLocation().pathname;
    const [currentLocation, setCurrentLocation] = useState(currentPath);
    const [sideBarCategory, setSideBarCategory] = useState(Number(localStorage.getItem('sideBarCategory')) || 1);
    const [tabView, setTabView] = useState(Number(localStorage.getItem('tabView')) || null);
    const [selectedPageOption, setSelectedPageOption] = useState({ name: '5', code: 5 });

    useEffect(() => {
        localStorage.setItem('sideBarCategory', Number(sideBarCategory));
    }, [sideBarCategory]);

    useEffect(() => {
        localStorage.setItem('tabView', Number(tabView));
    }, [tabView]);

    useEffect(() => {
        setCurrentLocation(currentPath);
    }, [currentPath]);

    return (
        <AdminContext.Provider value={{
            currentLocation,
            sideBarCategory, setSideBarCategory,
            tabView, setTabView,
            selectedPageOption, setSelectedPageOption
        }} >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext);