import {createContext, useContext, useState} from "react";

const AboutVideoContext = createContext();

export const AboutVideoProvider = ({ children }) => {
    const [video, setVideo] = useState(null);
    const [videoList, setVideoList] = useState([]);

    return (
        <AboutVideoContext.Provider value={{
            video,
            setVideo,
            videoList,
            setVideoList
        }} >
            {children}
        </AboutVideoContext.Provider>
    )
}

export const useAboutVideoContext = () => useContext(AboutVideoContext);