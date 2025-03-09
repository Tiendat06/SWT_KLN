import {createContext, useContext, useEffect, useState} from "react";

const AboutVideoContext = createContext();

export const AboutVideoProvider = ({ children }) => {
    const [video, setVideo] = useState('');
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