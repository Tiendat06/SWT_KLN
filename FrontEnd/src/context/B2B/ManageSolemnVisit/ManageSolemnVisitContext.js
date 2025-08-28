import {createContext, useContext, useReducer, useState} from "react";
import {initialState, manageSolemnVisitReducer} from "~/store/B2B/ManageSolemnVisit/reducer";

const ManageSolemnVisitContext = createContext();

export const ManageSolemnVisitProvider = ({children}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [visible, setVisible] = useState(false);
    const [state, dispatch] = useReducer(manageSolemnVisitReducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const {solemnVisits, solemnVisitDetail, selectedSolemnVisits, isUpdated: stateIsUpdated, isLoading: stateIsLoading} = state;

    const setSelectedSolemnVisits = (selected) => {
        dispatch({ type: 'SET_SELECTED_SOLEMN_VISITS', payload: selected });
    };

    const triggerDeleteSingle = (solemnVisit) => {
        setSelectedSolemnVisits([solemnVisit]);
        setVisible(true);
    };

    const resetSelection = () => {
        setSelectedSolemnVisits([]);
    };

    const setIsUpdated = (value) => {
        dispatch({ type: 'SET_IS_UPDATED', payload: value });
    };

    return (
        <ManageSolemnVisitContext.Provider value={{
            visible, setVisible,
            isLoading: stateIsLoading, setIsLoading,
            dispatch, isUpdated: stateIsUpdated, setIsUpdated,
            solemnVisits, solemnVisitDetail, selectedSolemnVisits,
            selectedItems, setSelectedItems,
            setSelectedSolemnVisits, triggerDeleteSingle, resetSelection
        }}>
            {children}
        </ManageSolemnVisitContext.Provider>
    )
}

export const useManageSolemnVisitContext = () => useContext(ManageSolemnVisitContext);
