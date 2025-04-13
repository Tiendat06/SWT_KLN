import {createContext, useContext, useRef} from "react";

const AppContext =createContext();

export const AppProvider = ({ children }) => {
    let dataContext = {
        id: 1,
        name: 'Test',
        age: 18
    }
    const toast = useRef(null);

    return (
        <AppContext.Provider value={{
            dataContext,
            toast
        }} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);