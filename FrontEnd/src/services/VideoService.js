import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import { DEFAULT_FETCH, DEFAULT_PAGE } from "~/utils/Constansts";
import axios from "axios";

const videoRoute = "api/Video";
const API_URL = "http://localhost:3000/api"; 

// Lấy danh sách video
const getVideoListService = async (
  fetch = DEFAULT_FETCH,
  page = DEFAULT_PAGE,
  type = MediaType.None,
  keyword = ""
) => {
  return await UseFetchAPI({
    api: `${videoRoute}`,
    params: {
      fetch,
      page,
      type,
      keyword,
    },
  });
};

// Lấy video theo ID
const getVideoByIdService = async (id) => {
  return await UseFetchAPI({
    api: `${videoRoute}/${id}`,
  });
};

// Lấy tổng số video
const getTotalVideoService = async (type = MediaType.None) => {
  return await UseFetchAPI({
    api: `${videoRoute}/total`,
    params: {
      type,
    },
  });
};

// Tạo FormData cho video
const buildVideoFormData = ({ title, mediaTypeId, userId, videoFile, videoLink, imageFile }) => {
  const formData = new FormData();
  formData.append("Title", title?.trim() || "");
  formData.append("mediaTypeId", parseInt(mediaTypeId));
  formData.append("userId", userId?.trim() || "");

  if (videoFile) {
    formData.append("videoFile", videoFile);
  } else if (videoLink) {
    formData.append("videoLink", videoLink.trim());
  }

  if (imageFile) {
    formData.append("capture", imageFile);
  }

  return formData;
};


const updateVideoService = async (id, payload) => {
  const formData = buildVideoFormData(payload);

  console.log("FormData gửi đi:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value instanceof File ? value.name : value);
  }

  try {
    const res = await fetch(`${API_URL}/Video/${id}`, {
      method: "PUT",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Lỗi từ server:", result); 
      return {
        isError: true,
        message: result.message || "UpdateVideoFailed: Lỗi không xác định từ server",
        errorFields: result?.errors || null,
      };
    }

    return { isError: false, data: result };
  } catch (err) {
    console.error("Fetch error:", err);
    return { isError: true, message: "UpdateVideoFailed: Lỗi kết nối hoặc server" };
  }
};


export const videoService = {
  getVideoListService,
  getVideoByIdService,
  getTotalVideoService,
  updateVideoService,
};
