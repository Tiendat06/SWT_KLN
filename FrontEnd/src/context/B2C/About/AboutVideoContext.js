import {createContext, useContext, useState} from "react";
import {useParams} from "react-router-dom";

const AboutVideoContext = createContext();

export const AboutVideoProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const {videoId} = useParams();

    return (
        <AboutVideoContext.Provider value={{
            videoList,
            setVideoList,
            videoId,
            selectedVideo, setSelectedVideo,
            isLoading, setIsLoading
        }} >
            {children}
        </AboutVideoContext.Provider>
    )
}

export const useAboutVideoContext = () => useContext(AboutVideoContext);