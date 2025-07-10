import React from 'react';
import styles from '~/styles/Pages/B2B/MediaDocument/editMultimedia.module.scss';

const KLNEdit = ({ onSave, onCancel }) => {
  return (
    <div className={styles.editMediaActions}>
      <button className={styles.editMediaSaveBtn} onClick={onSave}>Lưu</button>
      <button className={styles.editMediaCancelBtn} onClick={onCancel}>Hủy</button>
    </div>
  );
};

export default  KLNEdit ;
