import {createContext, useContext} from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    let dataContext = {
        id: 1,
        name: 'Test',
        age: 18
    }
    return (
        <AdminContext.Provider value={dataContext} >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext);