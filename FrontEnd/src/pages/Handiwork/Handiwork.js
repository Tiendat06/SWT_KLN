import KLNTitle from "~/components/KLNTitle/KLNTitle";
import styles from '~/styles/Pages/Handiwork/handiwork.module.scss';
import {handiwork_dsct} from '~/assets/img';
import clsx from "clsx";
import {useState} from "react";
import HandiworkEnum from "~/enum/Handiwork/Handiwork";

function Handiwork() {
    const [category, setCategory] = useState(0);

    const onClickCategory = (data) => {
        setCategory(data);
    }

    return (
        <>
            <div className={clsx(styles["handiwork"])}>
                <KLNTitle>
                    CÔNG TRÌNH MANG TÊN BÁC TÔN
                </KLNTitle>
                <div className={clsx(styles["handiwork-content"])}>
                    <div className={clsx(styles["handiwork-category"], 'col-lg-3 col-md-3 col-sm-3')}>
                        <ul className={clsx(styles["handiwork-category__list"])}>
                            <li onClick={() => onClickCategory(HandiworkEnum.HandiworkList)} className={clsx(styles["handiwork-category__item"],
                                (category === HandiworkEnum.HandiworkList && styles["handiwork-category__item--choose"])
                            )}>
                                <p>Danh sách công trình</p>
                            </li>
                            <li onClick={() => onClickCategory(HandiworkEnum.TDTUMemorial)} className={clsx(styles["handiwork-category__item"],
                                (category === HandiworkEnum.TDTUMemorial && styles["handiwork-category__item--choose"])
                            )}>
                                <p>Khu lưu niệm chủ tịch Tôn Đức Thắng</p>
                            </li>
                            <li onClick={() => onClickCategory(HandiworkEnum.TDTMuseum)} className={clsx(styles["handiwork-category__item"],
                                (category === HandiworkEnum.TDTMuseum && styles["handiwork-category__item--choose"])
                                )}>
                                <p>Bảo tàng Tôn Đức Thắng</p>
                            </li>
                            <li onClick={() => onClickCategory(HandiworkEnum.PolicyTDT)} className={clsx(styles["handiwork-category__item"],
                                (category === HandiworkEnum.PolicyTDT && styles["handiwork-category__item--choose"])
                            )}>
                                <p>Trường chính trị Tôn Đức Thắng</p>
                            </li>
                            <li style={{borderBottom: "none"}} onClick={() => onClickCategory(HandiworkEnum.TempleTDT)} className={clsx(styles["handiwork-category__item"],
                                (category === HandiworkEnum.TempleTDT && styles["handiwork-category__item--choose"])
                                )}>
                                <p>Đền thờ cố chủ tịch Tôn Đức Thắng</p>
                            </li>
                        </ul>
                    </div>

                    <div className={clsx(styles["handiwork-blog"], 'col-lg-9 col-md-9 col-sm-9')}>
                        <p>Đại học Tôn Đức Thắng (TDTU) là đại học công lập thuộc Tổng Liên đoàn Lao động Việt Nam; thành lập ngày 24/9/1997; đến nay TDTU đã trở thành đại học Top 2 của Việt Nam và đang trên đường xác lập vị trí trong danh sách các đại học tốt nhất Châu Á.</p>
                        <div className={clsx(styles["handiwork-blog__img"])}>
                            <img src={handiwork_dsct} alt=""/>
                        </div>
                        <p>
                            Thông điệp TDTU về phương châm hành động của toàn thể giảng viên, viên chức và sinh viên Đại học Tôn Đức Thắng là:
                        </p>
                        <p>- Không gì quan trọng hơn việc bảo đảm HIỆU QUẢ trong mọi hành động.</p>
                        <p>- Không gì đáng quý hơn sự CÔNG BẰNG trong mọi ứng xử.</p>
                        <p>- Không có gì đạo đức hơn TINH THẦN PHỤNG SỰ đất nước.</p>
                        <p>Tiền thân của Đại học Tôn Đức Thắng là Trường đại học công nghệ dân lập Tôn Đức Thắng, thành lập theo Quyết định 787/TTg-QĐ ngày 24/9/1997 của Thủ tướng Chính phủ. Trường do Liên đoàn Lao động thành phố Hồ Chí Minh sáng lập và quản lý thông qua Hội đồng quản trị Nhà trường do Chủ tịch Liên đoàn Lao động Thành phố đương nhiệm lúc đó làm Chủ tịch.</p>
                        <p>
                            Mục tiêu thành lập Trường trong giai đoạn đầu là: thực hiện Chương trình 17/TU và Chỉ thị 13 của Thành ủy Thành phố Hồ Chí Minh về đào tạo, đào tạo lại, bồi dưỡng và nâng cao trình độ chuyên môn, tay nghề cho giai cấp công nhân Thành phố; phát triển nguồn nhân lực cho nhu cầu công nghiệp hoá - hiện đại hoá; góp phần đào tạo nhân tài, nhân lực, thực hiện nghiên cứu để phục vụ hệ thống sản xuất, xã hội ở Thành phố Hồ Chí Minh và các tỉnh phía Nam.
                        </p>
                        <p>
                            Với sự phát triển nhanh chóng về mọi mặt, để Trường có pháp nhân phù hợp bản chất thực (là trường công và hoàn toàn không có yếu tố tư nhân); ngày 28/01/2003, Thủ tướng Chính phủ ra Quyết định số 18/2003/TTg-QĐ chuyển đổi pháp nhân và đổi tên Trường thành Trường đại học bán công Tôn Đức Thắng, trực thuộc Ủy ban nhân dân Thành phố Hồ Chí Minh. Như vậy, sau 5 năm rưỡi hoạt động dưới pháp nhân dân lập và đào tạo thiên về khối công nghệ-kỹ thuật; bằng quyết định này, Trường chính thức trở thành đại học đa ngành và không còn là trường dân lập nữa. Ngày 11/6/2008, Thủ tướng Chính phủ một lần nữa ra Quyết định số 747/TTg-QĐ đổi tên Trường đại học bán công Tôn Đức Thắng thành Trường đại học Tôn Đức Thắng và chuyển về thuộc Tổng Liên đoàn Lao động Việt Nam. Cùng trong thời gian này, mục tiêu của Trường được xác định thêm là trực tiếp phục vụ việc phát triển nguồn nhân lực trong công nhân, người lao động để góp phần xây dựng giai cấp công nhân Việt Nam trong Nghị quyết 20-NQ/TW ngày 28/01/2008 của Hội nghị Lần thứ 6 Ban chấp hành trung ương Đảng Khóa 10.
                        </p>
                        <p>
                            Đến ngày 29/01/2015, tại Quyết định số 158/QĐ-TTg, Thủ tướng Chính phủ phê duyệt Đề án thí điểm đổi mới cơ chế hoạt động của Trường đại học Tôn Đức Thắng giai đoạn 2015-2017; mục tiêu của Đại học Tôn Đức Thắng được xác định rằng: “Đại học Tôn Đức Thắng chủ động huy động, sử dụng hợp lý, hiệu quả nhất các nguồn lực của Trường và xã hội (không sử dụng vốn ngân sách nhà nước) để phát triển Trường đại học Tôn Đức Thắng thành một trường đại học định hướng nghiên cứu có chất lượng ở trong khu vực và trên thế giới; đồng thời bảo đảm các đối tượng chính sách, đối tượng thuộc hộ nghèo có cơ hội tiếp cận các chương trình đào tạo của Trường”.
                        </p>
                        <p>
                            Như vậy, trong 20 năm qua, theo nhu cầu phát triển của đất nước và sự tăng trưởng nhanh chóng của Nhà trường, mục tiêu thành lập Trường đã được điều chỉnh 2 lần; và Đại học Tôn Đức Thắng trong 20 năm kế tiếp có nhiệm vụ trở thành một đại học nghiên cứu thuộc TOP 60 trường đại học tốt nhất Châu Á cũng như trở thành một đại học hàng đầu trong TOP 500 trường đại học tốt nhất thế giới. Martin Luther từng nói: “Khi trường học phát triển, mọi thứ đều phát triển theo”. Đại học Tôn Đức Thắng sẽ trở thành đại học số 1 Việt Nam để phụng sự tốt nhất cho đất nước, nhân dân Việt Nam; cũng như sự phát triển ổn định, bền vững và hòa bình của thế giới
                        </p>
                        <p>
                            Xem thêm chi tiết tại Website: <a target="_blank" rel="noreferrer" href="http://www.tdtu.edu.vn/">http://www.tdtu.edu.vn/</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Handiwork;