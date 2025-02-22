import clsx from "clsx";
import styles from '~/styles/Pages/Memorial/memorialTemple.module.scss';
import { temple_img_1, temple_img_2 } from '~/assets/img';
function MemorialTemple() {
    return (
        <>
            <div className={clsx(styles["memorialtemple"])}>
                <div className={clsx(styles["memorialtemple-title"])}>
                    <h3 className={clsx(styles['memorialtemple-title__text'])}>
                        ĐỀN TƯỞNG NIỆM CHỦ TỊCH TÔN ĐỨC THẮNG
                    </h3>
                </div>
                <div className={clsx(styles["memorialtemple-content"])}>
                    <p>
                        Ngôi đền được khởi công xây dựng vào ngày 21 tháng 5 năm 1997 và hoàn thành ngày 30 tháng 7 năm 1998, khánh thành vào 20/08/1998 nhân kỷ niệm tròn 110 năm ngày sinh Bác Tôn.
                        <br />Đền tưởng niệm được xây cất theo kiến trúc đền đài cổ Việt Nam pha lẫn nét đặc thù của đồng bằng Nam Bộ.
                    </p>
                    <div className={clsx(styles["memorialtemple-content__img"])}>
                        <img src={`${temple_img_1}`} alt="" />
                        <p>
                            Đền tưởng niệm chủ tịch Tôn Đức Thắng
                        </p>
                    </div>
                    <p>
                        Diện tích tổng thể của ngôi đền 1600m<sup>2</sup> riêng phần chính diện 110m<sup>2</sup>. Con số 110 ở đây các nhà thiết kế xây dựng muốn đánh dấu sự thành công và lòng tôn kính của mình đối với vị lãnh tụ nhân kỷ niệm ngày sinh của người.
                    </p>
                    <p>
                        Trên nóc đền với hai tầng mái ngói uống cong duyên dáng mang nhiều âm hưởng kiến trúc truyền thống đồng bằng Sông Hồng. Mái lợp ngói đại ống loại ngói phổ biến dùng cho các chùa triền Nam bộ. Bờ dãi và đầu đao được đắp nổi các tượng Rồng con vật truyền thống luôn gắn bó chặt chẽ với đời sống tâm linh của người việt. Trước khi vào đền quí khách bước qua hai cấp bậc hành lang, bật thứ nhất có 9 cấp, bậc thứ nhì có 7 cấp. Chín và bảy ở đây tượng trưng cho quy luật âm dương hòa quyện thể hiện cuộc sống thanh bình.
                    </p>
                    <p>
                        Về phần trang trí nội thất: Bên trong ngôi đền chính giữa là bao lam, bao lam ở đây gồm ba mảng trạm khắc ghép thành. Mỗi mảng gồm hai phần chính, phần dìm đỡ bên dưới và phần vách trạm bên trên. Phần diềm đỡ bên dưới được trạm hình hai con rồng đang chầu vào cuốn thư. Trên cuốn thư là tên của chủ tịch: Tôn Đức thắng được viết theo lối chữ giả cổ, phía dưới hai con rồng là hình trạm những thanh tre to chắc vương cao, thể hiện ý chí kiên cường trung dũng bất khuất của Bác. Ở dưới là bộ cá hóa long đỡ lấy toàn bộ bao lam. Phần vách trạm bên trên người dân thường gọi là thành vọng. Gồm nhiều tấm trạm nhỏ ghép thành với các loài hoa: hoa sen, hoa cúc, hoa mai, trên cùng là hoa lan. Các loại hoa thể hiện tính cách thanh cao trong sáng của Bác. Nơi quí khách đang đứng là phần chính điện của ngôi đền, chính điện thờ tượng bán thân đúc đồng của chủ tịch TÔN ĐỨC THẮNG tượng nặng 310 kg. Phía sau là bức phong sơn mài màu son đỏ, phía trên bức phong sơn mài được đắp nổi hình tượng chiếc trống đồng ngọc lũ hồn thiêng sông núi Việt Nam.
                    </p>
                    <div className={clsx(styles["memorialtemple-content__img"])}>
                        <img src={`${temple_img_2}`} alt="" />
                        <p>
                            Trang trí bên trong đền tưởng niệm chủ tịch Tôn Đức Thắng                        </p>
                    </div>
                </div>
            </div>
        </>
    )
} export default MemorialTemple;