import UseFetchAPI from "~/hooks/UseFetchAPI";
import MediaType from "~/enum/MediaType/MediaType";
import { DEFAULT_FETCH, DEFAULT_PAGE, TEST_USER_ID } from "~/utils/Constansts";

const blogRoute = 'api/Blog';

// Lấy blog theo id
const getBlogByIdService = async (id) => {
    return await UseFetchAPI({
        api: `${blogRoute}/${id}`,
    });
};

// Lấy danh sách blog
const getBlogListService = async (
    fetch = DEFAULT_FETCH,
    page = DEFAULT_PAGE,
    type = MediaType.None,
    keyword = ""
) => {
    return await UseFetchAPI({
        api: `${blogRoute}`,
        params: {
            fetch, page, type, keyword,
        }
    });
};

// Tạo blog mới
const createBlogService = async (blogData, mediaType = MediaType.None) => {
    const formData = new FormData();
    formData.append("BlogTitle", blogData.title);
    formData.append("BlogContent", blogData.content);
    formData.append("UserId", TEST_USER_ID);
    formData.append("MediaTypeId", mediaType);
    formData.append("Description", blogData.description || "");
    if (blogData.imageFile) {
        formData.append("BlogImageFile", blogData.imageFile);
    }

    return await UseFetchAPI({
        api: `${blogRoute}`,
        method: "POST",
        body: formData,
        headers: null
    });
};

// Cập nhật blog
const updateBlogService = async (blogId, blogData, mediaType = MediaType.None) => {
    const formData = new FormData();
    formData.append("BlogTitle", blogData.title);
    formData.append("BlogContent", blogData.content);
    formData.append("UserId", TEST_USER_ID);
    formData.append("MediaTypeId", mediaType);
    formData.append("Description", blogData.description || "");
    if (blogData.imageFile) {
        formData.append("BlogImageFile", blogData.imageFile);
    }

    return await UseFetchAPI({
        api: `${blogRoute}/${blogId}`,
        method: "PUT",
        body: formData,
        headers: null
    });
};

// Xóa nhiều blog
const deleteBlogsService = async (ids) => {
    return await UseFetchAPI({
        api: `${blogRoute}/ids`,
        method: "DELETE",
        body: JSON.stringify(ids),
        headers: {
            "Content-Type": "application/json",
        }
    });
};

export const blogService = {
    getBlogByIdService,
    getBlogListService,
    createBlogService,
    updateBlogService,
    deleteBlogsService,
};