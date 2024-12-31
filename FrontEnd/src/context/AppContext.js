import{createContext, useContext} from "react";

const AppContext =createContext();

export const AppProvider = ({ children }) => {
    let dataContext = {
        id: 1,
        name: 'Test',
        age: 18
    }
    return (
        <AppContext.Provider value={{dataContext}} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);