import clsx from "clsx";
import styles from '~/styles/Pages/About/aboutCreature.module.scss';
import {ButtonLink, CreatureList} from '~/features/About';
import {tac_pham_2, tac_pham_3, tac_pham_4} from "~/assets/img";
import {KLNButton} from "~/components";
import {AboutBooksMagazinesProvider} from "~/context/About/AboutBooksMagazinesContext";

function AboutCreature() {
    return (
        <>
            <div className={clsx(styles["about-creature"])}>
                <div className={clsx(styles["about-creature__bg"])}>
                    <h1 className={clsx(styles["about-creature__bg-title"])}>TÁC PHẨM VỀ BÁC</h1>
                </div>
            </div>
            <ul className={clsx(styles['about-creature__list'])}>
                <li className={clsx(styles["about-creature__item"])}>
                    <div className={clsx(styles["about-creature__item--inner"])}>
                        <div className={clsx(styles["about-creature__item-img"])}>
                            <img src={tac_pham_2} alt=""/>
                        </div>
                        <h5 className={clsx(styles["about-creature__item-title"])}>
                            Sách
                        </h5>
                        <div className={clsx(styles["about-creature__item-btn"])}>
                            <ButtonLink isBookNavigation={true} />
                        </div>
                    </div>
                </li>
                <li className={clsx(styles["about-creature__item"])}>
                    <div className={clsx(styles["about-creature__item--inner"])}>
                        <div className={clsx(styles["about-creature__item-img"])}>
                            <img src={tac_pham_3} alt=""/>
                        </div>
                        <h5 className={clsx(styles["about-creature__item-title"])}>
                            Báo - Tạp Chí
                        </h5>
                        <div className={clsx(styles["about-creature__item-btn"])}>
                            <ButtonLink isBookNavigation={false} />
                        </div>
                    </div>
                </li>
                <li className={clsx(styles["about-creature__item"])}>
                    <div className={clsx(styles["about-creature__item--inner"])}>
                        <div className={clsx(styles["about-creature__item-img"])}>
                            <img src={tac_pham_4} alt=""/>
                        </div>
                        <h5 className={clsx(styles["about-creature__item-title"])}>
                            Tài liệu đa phương tiện
                        </h5>
                        <div className={clsx(styles["about-creature__item-btn"])}>
                            <KLNButton urlLink={`/about-multimedia-documents`} options={2}>Xem chi tiết</KLNButton>
                        </div>
                    </div>
                </li>
            </ul>

            <CreatureList/>
        </>
    )
}

export default AboutCreature;