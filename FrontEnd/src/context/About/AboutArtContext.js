import {createContext, useContext, useState} from "react";

const AboutArtContext = createContext();

export const AboutArtProvider = ({ children }) => {
    const [slideImageList, setSlideImageList] = useState([
        {}, {}, {}, {}, {}, {}
    ]);

    const [slideImageMain, setSlideImageMain] = useState();

    return (
        <AboutArtContext.Provider value={{slideImageList, setSlideImageList, slideImageMain, setSlideImageMain}} >
            {children}
        </AboutArtContext.Provider>
    )
}

export const useAboutArtContext = () => useContext(AboutArtContext);