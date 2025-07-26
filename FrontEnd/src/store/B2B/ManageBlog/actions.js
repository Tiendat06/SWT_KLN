import {
  GET_BLOGS,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  SET_BLOG_DETAIL,
  SET_SELECTED_BLOGS,
  CLEAR_SELECTED_BLOGS
} from './constants';

export const getBlogsAction = (blogs) => ({
  type: GET_BLOGS,
  payload: blogs,
});

export const addBlogAction = (blog) => ({
  type: ADD_BLOG,
  payload: blog,
});

export const updateBlogAction = (blog) => ({
  type: UPDATE_BLOG,
  payload: blog,
});

export const deleteBlogAction = (ids) => ({
  type: DELETE_BLOG,
  payload: ids,
});

export const setBlogDetailAction = (blog) => ({
  type: SET_BLOG_DETAIL,
  payload: blog,
});

export const setSelectedBlogsAction = (ids) => ({
  type: SET_SELECTED_BLOGS,
  payload: ids,
});

export const clearSelectedBlogsAction = () => ({
  type: CLEAR_SELECTED_BLOGS,
}); 