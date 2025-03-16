import {Button} from "~/components";
import {useEffect, useState} from "react";
import {getBookListService} from "~/services/BookService";
import {getMagazineListService} from "~/services/MagazineService";

const ButtonLink = ({isBookNavigation = true}) => {
    const [itemsId, setItemsId] = useState(null);
    useEffect(() => {
        const getItemId = async () => {
            let data;
            let id;
            if (isBookNavigation){
                data = await getBookListService(1, 1);
                id = data?.data?.items[0]?.bookId
            }
            else{
                data = await getMagazineListService(1, 1);
                id = data?.data?.items[0]?.magazineId
            }
            setItemsId(id);
        }
        getItemId();
    }, []);

    return (
        <>
            <Button
                urlLink={`/about-books-magazines/${itemsId}`}
                options={2}>Xem chi tiết</Button>
        </>
    )
}

export default ButtonLink;