import {createContext, useContext, useState} from "react";

const MemorialArtifactContext = createContext();

export const MemorialArtifactProvider = ({ children }) => {
    const [slideImageList, setSlideImageList] = useState([
        {}, {}, {}, {}, {}, {}
    ]);

    const [slideImageMain, setSlideImageMain] = useState();

    return (
        <MemorialArtifactContext.Provider value={{slideImageList, setSlideImageList, slideImageMain, setSlideImageMain}} >
            {children}
        </MemorialArtifactContext.Provider>
    )
}

export const useMemorialArtifactContext = () => useContext(MemorialArtifactContext);