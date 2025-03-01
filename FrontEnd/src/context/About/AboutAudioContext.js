import {createContext, useContext, useEffect, useState} from "react";

const AboutAudioContext = createContext();

export const AboutAudioProvider = ({ children }) => {
    const [audioSrc, setAudioSrc] = useState('');

    return (
        <AboutAudioContext.Provider value={{audioSrc, setAudioSrc}} >
            {children}
        </AboutAudioContext.Provider>
    )
}

export const useAboutAudioContext = () => useContext(AboutAudioContext);