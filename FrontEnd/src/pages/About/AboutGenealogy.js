import clsx from "clsx";
import styles from '~/styles/Pages/About/aboutGenealogy.module.scss';
import {gia_pha,tuong_BacTon ,tau} from '~/assets/img';

function AboutGenealogy() {
    return (
        <>
            <div className={clsx(styles["aboutgenealogy"])}>
                <div className={clsx(styles["aboutgenealogy-title"])}>
                    <h3 className={clsx(styles['aboutgenealogy-title__text'])}>
                        GIA PHẢ BÁC TÔN
                    </h3>
                </div>
                <div className={clsx(styles["aboutgenealogy-genealogy"])}>
                    <div className={clsx(styles["aboutgenealogy-genealogy__img"])}>
                        <img src={`${gia_pha}`} alt=""/>
                    </div>
                    <div className={clsx(styles["aboutgenealogy-genealogy__info"])}>
                        <p className={clsx(styles["aboutgenealogy-genealogy__info-title"])}>Gia phả chủ tịch Tôn Đức Thắng</p>
                        <h4 className={clsx(styles["aboutgenealogy-genealogy__info-text"])}>Thân Thế</h4>
                        <hr className={clsx(styles["aboutgenealogy-genealogy__info-hr"],'')} />
                        <p className={clsx(styles['aboutgenealogy-genealogy__info-para'])}>Tôn Đức Thắng, bí danh Thoại Sơn, sinh ngày 20 tháng 8 năm 1888 tạiCù lao Ông Hổ,
                             làng Mỹ Hoà Hưng, tổng Định Thành, hạt Long Xuyên (nay thuộc xã Mỹ Hòa Hưng, thành phố Long Xuyên, tỉnh An Giang). 
                             Là con đầu của ông Tôn Văn Đề (1864-1938), và bà Nguyễn Thị Dị (1867-1947). Gia đình đông con, theo thông lệ miền Nam, ông còn được gọi là Hai Thắng.</p>
                        <div className={clsx(styles["aboutgenealogy-genealogy__info__img1"],'')}>
                            <img src={`${tuong_BacTon}`} alt=""/>
                        </div>
                        <p className={clsx(styles['aboutgenealogy-genealogy__info-para1'])}>Gia đình ông thuộc hạng nông dân khá giả nên từ nhỏ ông đã được học hành đàng hoàng. 
                            Năm 1906, sau khi tốt nghiệp Sơ cấp tiểu học Đông Dương (Certificat d'Etudes Primaires Complémentaires Indochinoises-CEPCI) tại Long Xuyên,
                             ông rời quê lên Sài Gòn học nghề thợ máy tại Trường Cơ khí Á Châu (L'école des Mécaniciens Asiatiques), dân gian thường gọi là Trường Bá Nghệ.
                              Tốt nghiệp hạng ưu, ông được nhận vào làm công nhân ở Nhà máy Ba Son của Hải quân Pháp tại Sài Gòn.</p>
                    </div>
                </div>
                <div className={clsx(styles["aboutgenealogy-politicalactivity"])}>
                    <div className={clsx(styles["aboutgenealogy-politicalactivity__info"], 'col-lg-9 col-md-9 col-sm-12')}>
                        <h4 className={clsx(styles['aboutgenealogy-politicalactivity__info-text1'])}>Hoạt động chính trị</h4>
                        <hr className={clsx(styles["aboutgenealogy-politicalactivity__info-hr1"],'')} />
                        <p className={clsx(styles['aboutgenealogy-politicalactivity__info-para2'])}>
                        Năm 1912, Tôn Đức Thắng tham gia tổ chức công nhân bãi công đòi quyền lợi, vì vậy bị sa thải. 
                        Năm 1913, ông sang Pháp làm công nhân ở Toulon (Pháp). Năm 1914, ông được tuyển mộ làm lính thợ cho một đơn vị Hải quân Pháp, 
                        tham gia phản chiến chống lại cuộc can thiệp của Đế quốc Pháp vào nước Nga Xô Viết tại Hắc Hải (ngày 20 tháng 4 năm 1919),
                        treo cờ đỏ trên một thiết giáp hạm của Pháp tại đây để ủng hộ Cách mạng Nga.[1]
                        </p>
                        <div className={clsx(styles["aboutgenealogy-politicalactivity__info__img2"],'')}>
                            <img src={`${tau}`} alt=""/>
                        </div>
                        <p className={clsx(styles['aboutgenealogy-politicalactivity__info-para3'])}>
                        Gia đình ông thuộc hạng nông dân khá giả nên từ nhỏ ông đã được học hành đàng hoàng. 
                        Năm 1927, ông tham gia Hội Việt Nam Cách mạng Thanh niên, là Ủy viên Ban Chấp hành Thành bộ Sài Gòn<br/> và Kỳ bộ Nam Kỳ, 
                        và được phân công trực tiếp phụ trách phong trào công nhân Sài Gòn - Chợ Lớn.</p>
                        
                    </div>
                    
                </div>

            </div>
        </>
    )
}

export default AboutGenealogy;