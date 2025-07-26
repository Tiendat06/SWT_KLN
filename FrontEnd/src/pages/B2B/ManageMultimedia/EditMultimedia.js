import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { slideShowService } from '~/services/SlideShowService';
import { musicService } from '~/services/MusicService';
import { videoService } from '~/services/VideoService';
import styles from '~/styles/Pages/B2B/ManageMultimedia/editMultimedia.module.scss';
import KLNButton from '~/components/KLNButton/KLNButton';
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';
import { useAdminContext } from '~/context/AdminContext';
import TabViewEnum from '~/enum/TabView/TabViewEnum';

const EditMedia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tabView, setTabView } = useAdminContext();

  const normalizedType =
    tabView === TabViewEnum.ManageMultimediaTabImage
      ? 'image'
      : tabView === TabViewEnum.ManageMultimediaTabAudio
        ? 'audio'
        : 'video';

  const [formData, setFormData] = useState({
    title: '',
    link: '',
    videoImageLink: '',
    userId: '',
    mediaTypeId: '',
  });

  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (normalizedType === 'image') {
          const data = await slideShowService.getSlideShowByIdService(id);
          const imageData = data?.data?.slideImage?.[0];
          if (imageData) {
            setFormData({
              id: imageData.id,
              title: imageData.title ?? '',
              link: imageData.imageLink ?? '',
              mediaTypeId: imageData.mediaTypeId ?? '',
              userId: imageData.userId ?? '',
            });
          }
        } else if (normalizedType === 'audio') {
          const data = await musicService.getMusicByIdService(id);
          setFormData({
            id: data?.data?.id,
            title: data?.data?.musicTitle ?? '',
            link: data?.data?.musicLink ?? '',
            // mediaTypeId: data?.data?.mediaTypeId ?? '',
            userId: data?.data?.userId ?? '',
          });
        } else if (normalizedType === 'video') {
          const data = await videoService.getVideoByIdService(id);
          const videoData = data?.data;
          if (videoData) {
            setFormData({
              id: videoData?.videoId ?? '',
              title: videoData?.videoTitle ?? '',
              link: videoData?.videoLink ?? '',
              videoImageLink: videoData?.videoImageLink ?? '',
              userId: videoData?.userId ?? '', 
              mediaTypeId: videoData?.mediaTypeId ?? '',
            });
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Không tìm thấy dữ liệu! Có thể ID không đúng định dạng UUID.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, normalizedType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const title = formData.title?.trim();
    if (!title || title.length === 0) {
      alert('Tiêu đề không được để trống!');
      return false;
    }

    if (!formData.userId || formData.userId.trim() === '') {
      alert('User ID không được để trống!');
      return false;
    }

    const mediaTypeId = parseInt(formData.mediaTypeId);
    if (isNaN(mediaTypeId) || mediaTypeId <= 0) {
      alert('Media Type ID không hợp lệ!');
      return false;
    }

    if (!videoFile) {
      const label =
        normalizedType === 'image'
          ? 'hình ảnh'
          : normalizedType === 'audio'
            ? 'âm thanh'
            : 'video';

      alert(`Vui lòng chọn tệp ${label}!`);
      return false;
    }

    if (normalizedType === 'video' && !imageFile) {
      alert('Vui lòng chọn ảnh đại diện cho video!');
      return false;
    }

    return true;
  };


  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    let response;

    try {
      if (normalizedType === 'video') {
        console.log('=== VIDEO UPDATE DEBUG ===');
        console.log('formData:', formData);
        console.log('videoFile:', videoFile);
        console.log('imageFile:', imageFile);

        try {
            response = await videoService.updateVideoService(id, {
            title: formData.title,
            mediaTypeId: formData.mediaTypeId,
            userId: formData.userId,
            videoFile,
            imageFile,
          });

          console.log('API Response:', response);
        } catch (error) {
          console.error('API Error:', error);
          if (error?.response?.data) {
            console.log('Server Error Response:', error.response.data);
          }
        }







      } else if (normalizedType === 'audio') {
        console.log('=== AUDIO UPDATE DEBUG ===');
        console.log('formData:', formData);
        console.log('audioFile:', videoFile);

        const updateData = {
          musicTitle: formData.title.trim(), 
          musicFile: videoFile,
          mediaTypeId: parseInt(formData.mediaTypeId),
          userId: formData.userId.trim(),
        };

        console.log('updateData:', updateData);
        console.log('==========================');

        response = await musicService.updateMusicService(formData.id, updateData);
      } else if (normalizedType === 'image') {
        console.log('=== IMAGE UPDATE DEBUG ===');
        console.log('formData:', formData);
        console.log('imageFile:', videoFile);

        const updateData = {
          slideShowTitle: formData.title.trim(), 
          slideShowImage: videoFile,
          mediaTypeId: parseInt(formData.mediaTypeId),
          userId: formData.userId.trim(),
        };

        console.log('updateData:', updateData);
        console.log('==========================');

        response = await slideShowService.updateSlideShowService(formData.id, updateData);
      }

      console.log('API Response:', response);

      if (response?.isError === false) {
        alert('Cập nhật thành công!');
        navigate('/manage-multimedia');
      } else {
        const errorMessage = response?.message || response?.errors?.join(', ') || 'Có lỗi xảy ra';
        alert(`Lỗi: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Update error:', error);

      if (error.response) {
        const errorMessage = error.response.data?.message ||
          error.response.data?.errors?.join(', ') ||
          `HTTP ${error.response.status}: ${error.response.statusText}`;
        alert(`Lỗi từ server: ${errorMessage}`);
      } else if (error.request) {
        alert('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      } else {
        alert(`Đã xảy ra lỗi: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e, fileType = 'media') => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (fileType === 'media') {
        setVideoFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, link: reader.result }));
        };
        reader.readAsDataURL(selectedFile);
      } else if (fileType === 'image') {
        setImageFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, videoImageLink: reader.result }));
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const renderPreview = () => {
    if (!formData.link) {
      return <div className={styles.noPreview}>Chưa có tệp tin</div>;
    }

    if (normalizedType === 'image') {
      return (
        <img
          src={formData.link}
          alt={formData.title}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      );
    } else if (normalizedType === 'video') {
      return (
        <video
          src={formData.link}
          controls
          style={{ width: '100%', height: '200px' }}
        />
      );
    } else if (normalizedType === 'audio') {
      return (
        <audio
          src={formData.link}
          controls
          style={{ width: '100%' }}
        />
      );
    }
    return null;
  };

  const getAcceptType = () => {
    switch (normalizedType) {
      case 'image':
        return 'image/*';
      case 'audio':
        return 'audio/*';
      case 'video':
        return 'video/*';
      default:
        return '*/*';
    }
  };

  const getMediaTypeLabel = () => {
    switch (normalizedType) {
      case 'image':
        return 'Hình ảnh';
      case 'audio':
        return 'Âm thanh';
      case 'video':
        return 'Video';
      default:
        return 'Tệp tin';
    }
  };

  const getBreadcrumbLabel = () => {
    switch (normalizedType) {
      case 'image':
        return 'Danh sách ảnh';
      case 'audio':
        return 'Danh sách nhạc';
      case 'video':
        return 'Danh sách video';
      default:
        return 'Danh sách';
    }
  };

  if (isLoading) {
    return (
      <div className={styles.editMedia}>
        <div className={styles.loading}>Đang tải...</div>
      </div>
    );
  }

  return (
    <div className={styles.editMedia}>
      <h2 className={styles.editMediaTitle}>Chỉnh Sửa {getMediaTypeLabel()}</h2>

      <div className={styles.editMediaBreadcrumb}>
        <Link to="/administration/manage-multimedia">Tài liệu đa phương tiện</Link> /{' '}
        <Link
          to="/administration/manage-multimedia"
          onClick={() => {
            if (tabView === TabViewEnum.ManageMultimediaTabImage)
              setTabView(TabViewEnum.ManageMultimediaTabImage);
            else if (tabView === TabViewEnum.ManageMultimediaTabVideo)
              setTabView(TabViewEnum.ManageMultimediaTabVideo);
            else setTabView(TabViewEnum.ManageMultimediaTabAudio);
          }}
        >
          {getBreadcrumbLabel()}
        </Link>{' '}
        / Chỉnh sửa
      </div>

      <div className={styles.editMediaContent}>
        <div className={styles.editMediaColumn_Image}>
          <h3 className={styles.editMediaSectionTitle}>{getMediaTypeLabel()}</h3>
          <div className={`${styles.editMediaCard} ${styles.editMediaCardImage}`}>
            <div className={styles.editMediaImagePreview}>
              {renderPreview()}
            </div>

            <input
              type="file"
              accept={getAcceptType()}
              style={{ display: 'none' }}
              id="upload-media"
              onChange={(e) => handleFileChange(e, 'media')}
            />
            <label htmlFor="upload-media" className={styles.editMediaUploadBtn}>
              <i className="far fa-upload"></i> Chọn tệp {normalizedType}
            </label>
          </div>
        </div>

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
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className={styles.editMediaDetailRow}>
              <label className={styles.editMediaLabel}>Tiêu đề *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề..."
                required
              />
            </div>

            <div className={styles.editMediaDetailRow}>
              <label className={styles.editMediaLabel}>User ID *</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Nhập User ID..."
                required
              />
            </div>

            <div className={styles.editMediaDetailRow}>
              <label className={styles.editMediaLabel}>Media Type ID *</label>
              <input
                type="number"
                name="mediaTypeId"
                value={formData.mediaTypeId}
                onChange={handleChange}
                placeholder="Nhập Media Type ID..."
                required
                min="1"
              />
            </div>

            {normalizedType === 'video' && (
              <div className={styles.editMediaDetailRow}>
                <label className={styles.editMediaLabel}>Ảnh đại diện video</label>
                <div className={`${styles.editMediaCard} ${styles.editMediaCardImage}`}>
                  <div className={styles.editMediaImagePreview}>
                    {formData.videoImageLink ? (
                      <img
                        src={formData.videoImageLink}
                        alt="Ảnh đại diện video"
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                    ) : (
                      <div className={styles.noPreview}>Chưa có ảnh đại diện</div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-video-image"
                    onChange={(e) => handleFileChange(e, 'image')}
                  />

                  <label htmlFor="upload-video-image" className={styles.editMediaUploadBtn}>
                    <i className="far fa-upload"></i> Chọn ảnh đại diện
                  </label>
                </div>

                <input
                  type="text"
                  name="link" 
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="Nhập link video (nếu có)"
                  style={{ backgroundColor: '#f9f9f9', color: '#555' }}
                />


              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.editMediaFooter}>
        <div
          className={styles.editMediaFooterInner}
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <KLNButton
            onClick={handleSubmit}
            options={KLNButtonEnum.dangerBtn}
            btnClassName="px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? 'Đang lưu...' : 'Lưu'}
          </KLNButton>
          <KLNButton
            onClick={() => navigate(-1)}
            options={KLNButtonEnum.whiteBtn}
            btnClassName="px-4 py-2"
            disabled={isLoading}
          >
            Hủy
          </KLNButton>
        </div>
      </div>
    </div>
  );
};

export default EditMedia;