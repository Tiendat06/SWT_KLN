import {createContext, useContext, useState} from "react";
import {useParams} from "react-router-dom";

const AboutAudioContext = createContext();

export const AboutAudioProvider = ({children}) => {
    const [audio, setAudio] = useState('');
    const [audioList, setAudioList] = useState([]);
    const {audioId} = useParams();

    return (
        <AboutAudioContext.Provider value={{
            audio,
            setAudio,
            audioList,
            setAudioList,
            audioId
        }}>
            {children}
        </AboutAudioContext.Provider>
    )
}

export const useAboutAudioContext = () => useContext(AboutAudioContext);