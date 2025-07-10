import {createContext, useContext, useReducer, useState} from "react";
import reducer, {initialState} from "~/store/B2B/ManageMagazine/reducer";

const ManageMagazineContext = createContext();

export const ManageMagazineProvider = ({children}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {magazine, magazineList, book, bookList, isUpdated} = state;

    return (
        <ManageMagazineContext.Provider
            value={{
                visible, setVisible,
                isLoading, setIsLoading,
                book, bookList,
                magazine, magazineList, dispatch, isUpdated,
                selectedItems, setSelectedItems
            }}
        >
            {children}
        </ManageMagazineContext.Provider>
    )
}

export const useManageMagazineContext = () => useContext(ManageMagazineContext);
