import {createContext, useContext, useState} from "react";

const AboutMultimediaDocumentContext = createContext();

export const AboutMultimediaDocumentProvider = ({ children }) => {
    const [slideShowAboutArt, setSlideShowAboutArt] = useState([]);
    const [aboutVideo, setAboutVideo] = useState([]);
    const [aboutAudio, setAboutAudio] = useState([]);

    return (
        <AboutMultimediaDocumentContext.Provider value={{
            slideShowAboutArt, setSlideShowAboutArt,
            aboutVideo, setAboutVideo,
            aboutAudio, setAboutAudio
        }} >
            {children}
        </AboutMultimediaDocumentContext.Provider>
    )
}

export const useAboutMultimediaDocumentContext = () => useContext(AboutMultimediaDocumentContext);