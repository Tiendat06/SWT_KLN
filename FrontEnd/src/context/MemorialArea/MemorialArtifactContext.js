import {createContext, useContext, useState} from "react";
import {useParams} from "react-router-dom";

const MemorialArtifactContext = createContext();

export const MemorialArtifactProvider = ({ children }) => {
    const [slideImageList, setSlideImageList] = useState([]);
    const {slideShowId} = useParams();

    const [slideImageMain, setSlideImageMain] = useState({});

    return (
        <MemorialArtifactContext.Provider value={{
            slideShowId,
            slideImageList,
            setSlideImageList,
            slideImageMain,
            setSlideImageMain
        }} >
            {children}
        </MemorialArtifactContext.Provider>
    )
}

export const useMemorialArtifactContext = () => useContext(MemorialArtifactContext);