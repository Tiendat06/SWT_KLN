import {useAboutBooksMagazinesContext} from "~/context/About/AboutBooksMagazinesContext";
import {ListOfBooks, ListOfMagazines} from "~/features/About";

const ItemContent = () => {
    const {selectedBook, selectedMagazine} = useAboutBooksMagazinesContext();

    return (
        <>
            {selectedBook && <ListOfBooks />}
            {selectedMagazine && <ListOfMagazines />}
        </>
    )
}

export default ItemContent;