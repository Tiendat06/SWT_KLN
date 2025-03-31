import {createContext, useContext, useState} from "react";
import {useParams} from "react-router-dom";

const AboutArtContext = createContext();

export const AboutArtProvider = ({ children }) => {
    const [slideImageList, setSlideImageList] = useState([]);
    const [slideShow, setSlideShow] = useState({});
    const {slideShowId} = useParams();

    const [slideImageMain, setSlideImageMain] = useState();

    return (
        <AboutArtContext.Provider value={{
            slideShowId,
            slideImageList,
            setSlideImageList,
            slideImageMain,
            setSlideImageMain,
            slideShow,
            setSlideShow}} >
            {children}
        </AboutArtContext.Provider>
    )
}

export const useAboutArtContext = () => useContext(AboutArtContext);