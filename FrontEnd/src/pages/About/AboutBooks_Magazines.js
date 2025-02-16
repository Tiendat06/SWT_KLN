import {ListOfBooks,ListOfMagazines} from '~/features/About';
import styles from '~/styles/Pages/About/aboutSidebarBooks.module.scss';
import clsx from 'clsx';
function AboutBooksAndMagazines() {
    return (
        <>
        <div className={clsx(styles["aboutbooksandmagazines"])}>
                <div className={clsx(styles["aboutbooksandmagazines-title"])}>
                    <h3 className={clsx(styles['aboutbooksandmagazines-title__text'])}>
                        TIỂU SỬ CUỘC ĐỜI VÀ SỰ NGHIỆP CỦA CHỦ TỊCH TÔN ĐỨC THẮNG
                    </h3>
                </div>
        </div>
         <ListOfBooks/>
         <ListOfMagazines/>

        </>
    )
}

export default AboutBooksAndMagazines;