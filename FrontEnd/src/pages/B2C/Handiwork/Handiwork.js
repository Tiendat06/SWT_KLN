import KLNTitle from "~/components/KLNTitle/KLNTitle";
import styles from '~/styles/Pages/B2C/Handiwork/handiwork.module.scss';
import clsx from "clsx";
import {HandiworkProvider} from "~/context/B2C/Handiwork/HandiworkContext";
import {CategoryList, HandiworkContent} from "src/features/B2C/Handiwork";
import {Helmet} from "react-helmet-async";
import {HANDIWORK_TDT_TITLE} from "~/utils/Constansts";

const Handiwork = () => {

    return (
        <HandiworkProvider>
            <Helmet>
                <title>{HANDIWORK_TDT_TITLE}</title>
            </Helmet>
            <div className={clsx(styles["handiwork"])}>
                <KLNTitle>
                    CÔNG TRÌNH MANG TÊN BÁC TÔN
                </KLNTitle>
                <div className={clsx(styles["handiwork-content"], 'd-flex')}>
                    <div className={clsx(styles["handiwork-category"], 'col-lg-3 col-md-3 col-sm-3')}>
                        <ul className={clsx(styles["handiwork-category__list"])}>
                            <li style={{
                                borderBottom: "1px solid white"
                            }} className={clsx(styles["handiwork-category__item"], styles["handiwork-category__item--choose"])}>
                                <p style={{
                                    fontWeight: "bold",
                                    fontSize: 21,
                                    color: "white"
                                }}>Danh sách công trình</p>
                            </li>
                            <CategoryList />
                        </ul>
                    </div>
                    <HandiworkContent />
                </div>
            </div>
        </HandiworkProvider>
    )
}

export default Handiwork;