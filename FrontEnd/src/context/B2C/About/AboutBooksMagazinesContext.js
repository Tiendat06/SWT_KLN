import {createContext, useContext, useState} from "react";
import {useParams} from "react-router-dom";

const AboutBooksMagazinesContext = createContext();

export const AboutBooksMagazinesProvider = ({ children }) => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedMagazine, setSelectedMagazine] = useState(null);
    const {itemId} = useParams();
    // const [itemId, setItemId] = useState(null);

    return (
        <AboutBooksMagazinesContext.Provider value={{
            selectedBook, setSelectedBook,
            selectedMagazine, setSelectedMagazine,
            itemId
        }} >
            {children}
        </AboutBooksMagazinesContext.Provider>
    )
}

export const useAboutBooksMagazinesContext = () => useContext(AboutBooksMagazinesContext);