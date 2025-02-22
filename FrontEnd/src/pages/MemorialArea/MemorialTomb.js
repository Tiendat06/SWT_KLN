import clsx from "clsx";
import styles from '~/styles/Pages/Memorial/memorialTomb.module.scss';
import { tomb } from '~/assets/img';
function MemorialTomb() {
    return (
        <>
            <div className={clsx(styles["memorialtomb"])}>
                <div className={clsx(styles["memorialtomb-title"])}>
                    <h3 className={clsx(styles['memorialtomb-title__text'])}>
                        KHU MỘ CHÍ
                    </h3>
                </div>
                <div className={clsx(styles["memorialtomb-content"])}>
                    <p>
                        Phía sau ngôi nhà 50m là khu mộ của gia đình. Mộ cụ ông Tôn Văn Đề, cụ bà Nguyễn Thị Dị, kề bên là hai vợ chồng em trai thứ tư của BácTôn đó là Bác Tôn Đức Nhung vợ Bác Nhung Bà Nguyễn Thị Từ.
                    </p>
                    <p>
                        Khu mộ này trước đây được đắp xi măng. Sau có tô thêm phần đá rửa, khi được công nhận là di tích lịch sử văn hóa cấp quốc gia thì khu mộ của gia đình đã được tráng và tô cao thêm phần nền, đồng thời cũng xây đường đi từ khu mộ đến Ngôi nhà lưu niệm cho gia đình và khách tham quan tiện việc viếng thăm. Không khí miền quê trong lành và yên ả nên người dân ở đây sống rất thọ, khi nhìn vào bia mộ quý khách sẽ thấy rõ điều đó như cụ ông hưởng thọ 74 tuổi, cụ bà hưởng thọ 80 tuổi và Bác Nhung thọ 90 tuổi vợ Bác Nhung 89 tuổi và Bác Tôn có lẽ cũng được hưởng sự di truyền đó nên thọ 92 tuổi.
                    </p>
                    <div className={clsx(styles["memorialtomb-content__img"])}>
                        <img src={`${tomb}`} alt="" />
                        <p>Khu mộ chí</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemorialTomb;