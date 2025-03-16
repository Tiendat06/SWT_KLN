import KLNTitle from "~/components/KLNTitle/KLNTitle";
import styles from '~/styles/Pages/Handiwork/handiwork.module.scss';
import clsx from "clsx";
import {HandiworkProvider} from "~/context/Handiwork/HandiworkContext";
import {CategoryList, HandiworkContent} from "~/features/Handiwork";

function Handiwork() {

    return (
        <HandiworkProvider>
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
                                }}>Danh sách công trình</p>
                            </li>
                            <CategoryList />
                            {/*<li onClick={() => onClickCategory(HandiworkEnum.TDTU)} className={clsx(styles["handiwork-category__item"],*/}
                            {/*    (category === HandiworkEnum.TDTU && styles["handiwork-category__item--choose"])*/}
                            {/*)}>*/}
                            {/*    <p>Đại học Tôn Đức Thắng</p>*/}
                            {/*</li>*/}
                            {/*<li onClick={() => onClickCategory(HandiworkEnum.TDTUMemorial)} className={clsx(styles["handiwork-category__item"],*/}
                            {/*    (category === HandiworkEnum.TDTUMemorial && styles["handiwork-category__item--choose"])*/}
                            {/*)}>*/}
                            {/*    <p>Khu lưu niệm chủ tịch Tôn Đức Thắng</p>*/}
                            {/*</li>*/}
                            {/*<li onClick={() => onClickCategory(HandiworkEnum.TDTMuseum)} className={clsx(styles["handiwork-category__item"],*/}
                            {/*    (category === HandiworkEnum.TDTMuseum && styles["handiwork-category__item--choose"])*/}
                            {/*    )}>*/}
                            {/*    <p>Bảo tàng Tôn Đức Thắng</p>*/}
                            {/*</li>*/}
                            {/*<li onClick={() => onClickCategory(HandiworkEnum.PolicyTDT)} className={clsx(styles["handiwork-category__item"],*/}
                            {/*    (category === HandiworkEnum.PolicyTDT && styles["handiwork-category__item--choose"])*/}
                            {/*)}>*/}
                            {/*    <p>Trường chính trị Tôn Đức Thắng</p>*/}
                            {/*</li>*/}
                            {/*<li style={{borderBottom: "none"}} onClick={() => onClickCategory(HandiworkEnum.TempleTDT)} className={clsx(styles["handiwork-category__item"],*/}
                            {/*    (category === HandiworkEnum.TempleTDT && styles["handiwork-category__item--choose"])*/}
                            {/*    )}>*/}
                            {/*    <p>Đền thờ cố chủ tịch Tôn Đức Thắng</p>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                    <HandiworkContent />
                </div>
            </div>
        </HandiworkProvider>
    )
}

export default Handiwork;