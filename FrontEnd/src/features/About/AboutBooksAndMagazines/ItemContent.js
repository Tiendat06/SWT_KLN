import {useAboutBooksMagazinesContext} from "~/context/About/AboutBooksMagazinesContext";
import {ListOfBooks, ListOfMagazines} from "~/features/About";
import {useEffect} from "react";
import {getBookByIdService} from "~/services/BookService";
import {getMagazineByIdService} from "~/services/MagazineService";

const ItemContent = () => {
    const {
        selectedBook, selectedMagazine,
        setSelectedBook, setSelectedMagazine,
        itemId
    } = useAboutBooksMagazinesContext();

    useEffect(() => {
        const getDefaultItems = async () => {
            const defaultMagazineData = await getMagazineByIdService(itemId);
            const defaultBookData = await getBookByIdService(itemId);

            if (defaultMagazineData?.data !== undefined){
                setSelectedBook(null);
                setSelectedMagazine(defaultMagazineData?.data);
            } else if (defaultBookData?.data !== undefined) {
                setSelectedBook(defaultBookData?.data);
                setSelectedMagazine(null);
            }
        }
        getDefaultItems();
    }, [itemId]);

    return (
        <>
            {selectedBook && <ListOfBooks />}
            {selectedMagazine && <ListOfMagazines />}
        </>
    )
}

export default ItemContent;