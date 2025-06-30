import {createContext, useContext, useReducer, useState} from "react";
import reducer, {initialState} from "~/store/B2B/ManageMultimedia/reducer";

const ManageMultimediaContext = createContext();

export const ManageMultimediaProvider = ({children}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [visible, setVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const {image, imageList, video, videoList, audio, audioList, slideShow, isUpdated} = state;

    return (
        <ManageMultimediaContext.Provider value={{
            visible, setVisible,
            isLoading, setIsLoading,
            dispatch, isUpdated,
            image, imageList, slideShow,
            video, videoList,
            audio, audioList,
            selectedItems, setSelectedItems
        }}>
            {children}
        </ManageMultimediaContext.Provider>
    )
}

export const useManageMultimediaContext = () => useContext(ManageMultimediaContext);