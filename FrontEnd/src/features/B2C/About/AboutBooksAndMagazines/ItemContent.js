import {useAboutBooksMagazinesContext} from "~/context/B2C/About/AboutBooksMagazinesContext";
import {ListOfBooks, ListOfMagazines} from "~/features/B2C/About";
import {useEffect} from "react";
import {bookService} from "~/services/BookService";
import {magazineService} from "~/services/MagazineService";

const ItemContent = () => {
    const {
        selectedBook, selectedMagazine,
        setSelectedBook, setSelectedMagazine,
        itemId
    } = useAboutBooksMagazinesContext();

    useEffect(() => {
        const getDefaultItems = async () => {
            const defaultMagazineData = await magazineService.getMagazineByIdService(itemId);
            const defaultBookData = await bookService.getBookByIdService(itemId);

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