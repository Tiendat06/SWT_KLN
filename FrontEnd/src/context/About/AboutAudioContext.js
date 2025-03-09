import {createContext, useContext, useEffect, useState} from "react";

const AboutAudioContext = createContext();

export const AboutAudioProvider = ({ children }) => {
    const [audio, setAudio] = useState('');
    const [audioList, setAudioList] = useState(null);

    return (
        <AboutAudioContext.Provider value={{
            audio,
            setAudio,
            audioList,
            setAudioList
        }} >
            {children}
        </AboutAudioContext.Provider>
    )
}

export const useAboutAudioContext = () => useContext(AboutAudioContext);