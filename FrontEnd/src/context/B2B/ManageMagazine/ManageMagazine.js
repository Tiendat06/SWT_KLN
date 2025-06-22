import {createContext, useContext, useReducer, useState} from "react";
import reducer, {initialState} from "~/store/B2B/ManageMagazine/reducer";

const ManageMagazineContext = createContext();

export const ManageMagazineProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {magazine, magazineList, book, bookList} = state;

    return (
        <ManageMagazineContext.Provider
            value={{
                visible, setVisible,
                isLoading, setIsLoading,
                book, bookList,
                magazine, magazineList, dispatch
            }}
        >
            {children}
        </ManageMagazineContext.Provider>
    )
}

export const useManageMagazineContext = () => useContext(ManageMagazineContext);
