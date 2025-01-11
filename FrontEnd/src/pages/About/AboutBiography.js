import clsx from "clsx";
import styles from '~/styles/Pages/About/aboutBiography.module.scss';
import { bacTon, bacva_cacemnho } from '~/assets/img';


function AboutBiography() {
    return (
        <>
            <div className={clsx(styles["aboutbiography"])}>
                <div className={clsx(styles["aboutbiography-title"])}>
                    <h3 className={clsx(styles['aboutbiography-title__text'])}>
                        TIỂU SỬ CUỘC ĐỜI VÀ SỰ NGHIỆP CỦA CHỦ TỊCH TÔN ĐỨC THẮNG
                    </h3>
                </div>
                <div className={clsx(styles["aboutbiography-biography"])}>
                    <div className={clsx(styles["aboutbiography-biography__img"])}>
                        <img src={`${bacTon}`} alt="" />
                        <p className={clsx(styles["aboutbiography-biography-text"])}>Chân dung chủ tịch <br /> Tôn Đức Thắng </p>
                    </div>
                    <div className={clsx(styles["aboutbiography-biography__content"])}>
                        <p className={clsx(styles["aboutbiography-biography__content-text"])}>
                            <span className={clsx(styles["aboutbiography-biography__highlighted-text"])}>Tôn Đức Thắng</span> (20 tháng 8 năm 1888 - 30 tháng 3 năm 1980) là một nhà cách mạng, chính trị gia người Việt Nam.
                            <br />Ông là Chủ tịch nước cuối cùng của chính thể Việt Nam Dân chủ Cộng hòa từ năm 1969 đến năm 1976.
                            Từ năm 1976 đến <br />năm 1980, ông là Chủ tịch nước đầu tiên của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam cho đến khi qua đời.
                            Trước đó,<br /> ông là Phó Chủ tịch nước (1960-1969), Quyền Chủ tịch nước (2 tháng 9 - 22 tháng 9 năm 1969)
                            và Trưởng ban Thường trực Quốc hội (1955-1960).
                        </p>
                    </div>

                </div>
                <div className={clsx(styles["aboutbiography-politicalactivity"])}>
                    <div className={clsx(styles["aboutbiography-politicalactivity__info"], 'col-lg-9 col-md-9 col-sm-12')}>
                        <h4 className={clsx(styles['aboutbiography-politicalactivity__info-text'])}>Hoạt động chính trị</h4>
                        <hr className={clsx(styles["aboutbiography-politicalactivity__info-hr"])} />
                        <p className={clsx(styles['aboutbiography-politicalactivity__info-para'])}>
                            Tôn Đức Thắng (20 tháng 8 năm 1888 - 30 tháng 3 năm 1980) là một nhà cách mạng, chính trị gia người Việt Nam.
                            Ông là Chủ tịch nước cuối cùng của chính thể Việt Nam Dân chủ Cộng hòa từ năm 1969 đến năm 1976.
                            Từ năm 1976 đến năm 1980, ông là Chủ tịch nước đầu tiên của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam cho đến khi qua đời.
                            Trước đó, ông là Phó Chủ tịch nước (1960-1969), Quyền Chủ tịch nước <br/>(2 tháng 9 - 22 tháng 9 năm 1969) và Trưởng ban Thường trực Quốc hội (1955-1960).
                        </p>
                        <div className={clsx(styles["aboutbiography-politicalactivity__info-imgBacandCacem"], '')}>
                            <img src={`${bacva_cacemnho}`} alt="" />
                        </div>
                    </div>
                </div>
                <div className={clsx(styles["aboutbiography-family"])}>
                    <div className={clsx(styles["aboutbiography-family__infofamily"], 'col-lg-9 col-md-9 col-sm-12')}>
                        <h4 className={clsx(styles['aboutbiography-family__infofamily-text'])}>Gia đình</h4>
                        <hr className={clsx(styles["aboutbiography-family__infofamily-hr"])} />
                        <p className={clsx(styles['aboutbiography-family__infofamily-para'])}>
                        Tôn Đức Thắng (20 tháng 8 năm 1888 - 30 tháng 3 năm 1980) là một nhà cách mạng, chính trị gia người Việt Nam. 
                        Ông là Chủ tịch nước cuối cùng của chính thể Việt Nam Dân chủ Cộng hòa từ năm 1969 đến năm 1976. Từ năm 1976 đến năm 1980, 
                        ông là Chủ tịch nước đầu tiên của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam cho đến khi qua đời. Trước đó, ông là Phó Chủ tịch nước (1960-1969), 
                        Quyền Chủ tịch nước<br/> (2 tháng 9 - 22 tháng 9 năm 1969) và Trưởng ban Thường trực Quốc hội (1955-1960).
                        </p>
                        <div className={clsx(styles["aboutbiography-family__infofamily-imgBacandCacem"], '')}>
                            <img src={`${bacva_cacemnho}`} alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AboutBiography;