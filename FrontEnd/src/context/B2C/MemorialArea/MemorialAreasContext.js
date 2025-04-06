import {createContext, useContext, useState} from "react";

const MemorialAreasContext = createContext();

export const MemorialAreasProvider = ({ children }) => {
    const [slideImageList, setSlideImageList] = useState([]);
    const [slideImageMain, setSlideImageMain] = useState();

    return (
        <MemorialAreasContext.Provider value={{slideImageList, setSlideImageList, slideImageMain, setSlideImageMain}} >
            {children}
        </MemorialAreasContext.Provider>
    )
}

export const useMemorialAreasContext = () => useContext(MemorialAreasContext);