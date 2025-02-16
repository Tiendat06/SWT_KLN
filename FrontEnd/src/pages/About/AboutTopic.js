import { useState } from 'react';
import { Cde_Bac } from '~/features/About';
import styles from '~/styles/Pages/About/aboutTopic.module.scss';
import clsx from 'clsx';

function AboutTopic() {
    const [activeTab, setActiveTab] = useState('image'); // Quản lý tab đang chọn

    return (
        <div className={clsx(styles["aboutTopic"])}>
            {/* Tiêu đề */}
            <div className={clsx(styles["aboutTopic-title"])}>
                <h3 className={clsx(styles['aboutTopic-title__text'])}>
                    CHUYÊN ĐỀ HAY VỀ BÁC
                </h3>
            </div>

            <div className={clsx(styles["aboutTopic-contentWrapper"])}>
                {/* Tabs */}
                <div className={clsx(styles["aboutTopic-tabs"])}>
                    <button 
                        className={clsx(styles["aboutTopic-tabimage"], {
                            [styles["active"]]: activeTab === 'image'
                        })} 
                        onClick={() => setActiveTab('image')}
                    >
                        Ảnh
                    </button>
                    <button 
                        className={clsx(styles["aboutTopic-tabvideo"], {
                            [styles["active"]]: activeTab === 'video'
                        })} 
                        onClick={() => setActiveTab('video')}
                    >
                        Video
                    </button>
                </div>

               <Cde_Bac/>
            </div>
        </div>
    );
}

export default AboutTopic;
