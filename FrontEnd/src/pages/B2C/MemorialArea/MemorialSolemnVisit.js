import clsx from "clsx";
import {KLNTitle} from "~/components";
import styles from '~/styles/Pages/B2C/Memorial/memorialSolemnVisit.module.scss';
import {SolemnVisitList} from "src/features/B2C/MemorialArea";
import {MEMORIAL_TDT_TITLE} from "~/utils/Constansts";
import {Helmet} from "react-helmet-async";

const MemorialSolemnVisit = () => {

    return (
        <>
            <Helmet>
                <title>{MEMORIAL_TDT_TITLE}</title>
            </Helmet>
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