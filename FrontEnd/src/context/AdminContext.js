import {createContext, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getLocalStorage, setLocalStorage} from "~/utils/Storage";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const currentPath = useLocation().pathname;
    const [currentLocation, setCurrentLocation] = useState(currentPath);
    const [sideBarCategory, setSideBarCategory] = useState(Number(getLocalStorage('sideBarCategory')) || 1);
    const [editAction, setEditAction] = useState(false);
    const [deleteAction, setDeleteAction] = useState(false);
    const [tabView, setTabView] = useState(Number(getLocalStorage('tabView')) || null);
    const [selectedPageOption, setSelectedPageOption] = useState({ name: '5', code: 5 });

    useEffect(() => {
        setLocalStorage('sideBarCategory', Number(sideBarCategory));
    }, [sideBarCategory]);

    useEffect(() => {
        setLocalStorage('tabView', Number(tabView));
    }, [tabView]);

    useEffect(() => {
        setCurrentLocation(currentPath);
    }, [currentPath]);

    return (
        <AdminContext.Provider value={{
            currentLocation,
            sideBarCategory, setSideBarCategory,
            tabView, setTabView,
            selectedPageOption, setSelectedPageOption,
            editAction, setEditAction,
            deleteAction, setDeleteAction
        }} >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext);