import {createContext, useContext, useReducer, useState} from "react";
import reducer, {initialState} from "~/store/B2B/ManageMultimedia/reducer";

const ManageMultimediaContext = createContext();

export const ManageMultimediaProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {image, imageList, slideShow, isUpdated, selectedImageList} = state;

    return (
        <ManageMultimediaContext.Provider value={{
            visible, setVisible,
            dispatch, isUpdated,
            image, imageList, slideShow, selectedImageList
        }} >
            {children}
        </ManageMultimediaContext.Provider>
    )
}

export const useManageMultimediaContext = () => useContext(ManageMultimediaContext);