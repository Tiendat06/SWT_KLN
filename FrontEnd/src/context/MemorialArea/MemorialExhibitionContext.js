import {createContext, useContext, useState} from "react";
import {useParams} from "react-router-dom";

const MemorialExhibitionContext = createContext();

export const MemorialExhibitionProvider = ({ children }) => {
    const [slideImageList, setSlideImageList] = useState([]);
    const [slideShow, setSlideShow] = useState({});
    const {slideShowId} = useParams();

    const [slideImageMain, setSlideImageMain] = useState();

    return (
        <MemorialExhibitionContext.Provider value={{
            slideShowId,
            slideImageList,
            setSlideImageList,
            slideImageMain,
            setSlideImageMain,
            slideShow,
            setSlideShow
        }} >
            {children}
        </MemorialExhibitionContext.Provider>
    )
}

export const useMemorialExhibitionContext = () => useContext(MemorialExhibitionContext);