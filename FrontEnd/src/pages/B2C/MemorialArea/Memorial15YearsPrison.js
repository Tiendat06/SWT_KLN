import clsx from "clsx";
import styles from '~/styles/Pages/B2C/Memorial/memorial15YearsPrison.module.scss';
import { prison_img_1, prison_img_2 } from '~/assets/img';
function Memorial15YearsPrison() {
    return (
        <>
            <div className={clsx(styles["memorial15yearsprison"])}>
                <div className={clsx(styles["memorial15yearsprison-title"])}>
                    <h3 className={clsx(styles['memorial15yearsprison-title__text'])}>
                        TRƯNG BÀY CHUYÊN ĐỀ "15 NĂM TÙ CÔN ĐẢO"
                    </h3>
                </div>
                <div className={clsx(styles["memorial15yearsprison-content"])}>
                    <p>
                        Trưng bày chuyên đề "15 năm tù Côn Đảo” đây là nơi giới thiệu những hình ảnh, tư liệu và hiện vật về quá trình hình thành nhà tù Côn Đảo, phản ánh sinh động, chân thực về địa ngục trần gian mà những chiến sĩ cộng sản ta phải trải qua, đặc biệt là khoảng thời gian 15 năm Bác Tôn bị lưu đày ở địa ngục trần gian Côn Đảo.
                    </p>
                    <div className={clsx(styles["memorial15yearsprison-content__img"])}>
                        <img src={`${prison_img_1}`} alt="" />
                        <p>Chuyên đề "15 năm tù Côn Đảo”</p>
                        <img src={`${prison_img_2}`} alt="" />
                        <p>Chuyên đề "15 năm tù Côn Đảo”</p>

                    </div>
                </div>
            </div>
        </>
    )
} export default Memorial15YearsPrison;