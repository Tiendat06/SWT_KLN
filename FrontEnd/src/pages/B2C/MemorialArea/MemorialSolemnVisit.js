import clsx from "clsx";
import {KLNTitle} from "~/components";
import styles from '~/styles/Pages/B2C/Memorial/memorialSolemnVisit.module.scss';
import {SolemnVisitList} from "~/features/MemorialArea";

const MemorialSolemnVisit = () => {

    return (
        <>
            <div className={clsx(styles["memorial-solemn-visit"], 'mb-5')}>
                <KLNTitle>
                    LÃNH ĐẠO VIẾNG
                </KLNTitle>
                <SolemnVisitList/>
            </div>
        </>
    )
}

export default MemorialSolemnVisit;