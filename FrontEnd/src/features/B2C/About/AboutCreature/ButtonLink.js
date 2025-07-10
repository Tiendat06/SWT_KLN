import {KLNButton} from "~/components";
import {useEffect, useState} from "react";
import {bookService} from "~/services/BookService";
import {magazineService} from "~/services/MagazineService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

const ButtonLink = ({isBookNavigation = true}) => {
    const [itemsId, setItemsId] = useState(null);
    useEffect(() => {
        const getItemId = async () => {
            let data;
            let id;
            if (isBookNavigation){
                data = await bookService.getBookListService(1, 1);
                id = data?.data?.items[0]?.bookId
            }
            else{
                data = await magazineService.getMagazineListService(1, 1);
                id = data?.data?.items[0]?.magazineId
            }
            setItemsId(id);
        }
        getItemId();
    }, [isBookNavigation]);

    return (
        <>
            <KLNButton
                urlLink={`/about-books-magazines/${itemsId}`}
                options={KLNButtonEnum.secondaryBtn}>Xem chi tiết</KLNButton>
        </>
    )
}

export default ButtonLink;