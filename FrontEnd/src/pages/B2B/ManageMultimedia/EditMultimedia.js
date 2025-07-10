import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { slideShowService } from '~/services/SlideShowService';
import { musicService } from '~/services/MusicService';
import { videoService } from '~/services/VideoService';
import styles from '~/styles/Pages/B2B/ManageMultimedia/editMultimedia.module.scss';
import KLNEdit from '~/components/KLNEdit/KLNEdit';

const EditMedia = () => {
  const { id, type } = useParams(); // id ở đây cần là UUID
  const navigate = useNavigate();
  const normalizedType = type === 'music' ? 'audio' : type;

  const [formData, setFormData] = useState({
    capture: '',
    link: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      let data;
      try {
        if (normalizedType === 'image') {
          data = await slideShowService.getSlideShowByIdService(id);
          console.log('API image data:', data);
          if (data?.data?.slideImage?.length > 0) {
            const imageData = data.data.slideImage[0];
            setFormData({
              capture: imageData.capture ?? '',
              link: imageData.imageLink ?? ''
            });
          }
        } else if (normalizedType === 'audio') {
          data = await musicService.getMusicByIdService(id);
          console.log('API audio data:', data);
          if (data?.data) {
            setFormData({
              capture: data.data.capture ?? '',
              link: data.data.musicLink ?? ''
            });
          }
        } else if (normalizedType === 'video') {
          data = await videoService.getVideoByIdService(id);
          console.log('API video data:', data);
          if (data?.data) {
            setFormData({
              capture: data.data.capture ?? '',
              link: data.data.videoLink ?? ''
            });
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Không tìm thấy dữ liệu! Có thể ID không đúng định dạng UUID.');
      }
    };

    fetchData();
  }, [id, normalizedType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      capture: formData.capture,
      ...(normalizedType === 'image'
        ? { imageLink: formData.link }
        : normalizedType === 'audio'
        ? { musicLink: formData.link }
        : { videoLink: formData.link })
    };

    console.log('Submitting payload:', payload);

    let response;
    if (normalizedType === 'image') {
      response = await slideShowService.updateSlideImage(id, payload);
    } else if (normalizedType === 'audio') {
      response = await musicService.updateMusic(id, payload);
    } else if (normalizedType === 'video') {
      response = await videoService.updateVideo(id, payload);
    }

    if (response?.success) {
      alert('Cập nhật thành công!');
      navigate('/administration/manage-multimedia');
    } else {
      alert('Cập nhật thất bại!');
    }
  };

  return (
    <div className={styles.editMedia}>
      <h2 className={styles.editMediaTitle}>Chỉnh Sửa</h2>
      <div className={styles.editMediaBreadcrumb}>
        Tài liệu đa phương tiện / Danh sách {normalizedType} / Chỉnh sửa
      </div>

      <div className={styles.editMediaContent}>
        {/* Cột ảnh */}
        <div className={styles.editMediaColumnImage}>
          <h3 className={styles.editMediaSectionTitle}>{normalizedType}</h3>
          <div className={`${styles.editMediaCard} ${styles.editMediaCardImage}`}>
            <div className={styles.editMediaImagePreview}>
              {normalizedType === 'image' && formData.link && (
                <img src={formData.link} alt={formData.capture} />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData(prev => ({ ...prev, link: reader.result }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label htmlFor="upload-image" className={styles.editMediaUploadBtn}>
              <i className="far fa-image"></i> Chọn tệp {normalizedType}
            </label>
          </div>
        </div>

        {/* Cột thông tin chi tiết */}
        <div className={styles.editMediaColumnDetails}>
          <h3 className={styles.editMediaSectionTitle}>Thông tin chi tiết</h3>
          <div className={`${styles.editMediaCard} ${styles.editMediaCardDetails}`}>
            <div className={styles.editMediaTopRow}>
              <i className="far fa-calendar" style={{ color: '#666' }}></i>
              <span className={styles.editMediaLabel}>Ngày cập nhật</span>
              <span className={styles.editMediaDate}>
                {new Date().toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className={styles.editMediaDetailRow}>
              <label className={styles.editMediaLabel}>Mô tả</label>
              <textarea
                name="capture"
                value={formData.capture}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.editMediaFooter}>
        <div className={styles.editMediaFooterInner}>
          <KLNEdit
            onSave={handleSubmit}
            onCancel={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditMedia;
