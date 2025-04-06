import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";

const HandiworkContext = createContext();

export const HandiworkProvider = ({ children }) => {
    const {blogId} = useParams();

    return (
        <HandiworkContext.Provider value={{
            blogId
        }} >
            {children}
        </HandiworkContext.Provider>
    )
}

export const useHandiworkContext = () => useContext(HandiworkContext);