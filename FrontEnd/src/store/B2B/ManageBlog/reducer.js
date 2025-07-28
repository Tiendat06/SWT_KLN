import {
  GET_BLOGS,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  SET_BLOG_DETAIL,
  SET_SELECTED_BLOGS,
  CLEAR_SELECTED_BLOGS
} from './constants';

const initialState = {
  blogs: [],
  blogDetail: null,
  selectedBlogs: [],
};

const manageBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
      };
    case UPDATE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.blogId === action.payload.blogId ? action.payload : blog
        ),
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => !action.payload.includes(blog.blogId)),
        selectedBlogs: state.selectedBlogs.filter((id) => !action.payload.includes(id)),
      };
    case SET_BLOG_DETAIL:
      return {
        ...state,
        blogDetail: action.payload,
      };
    case SET_SELECTED_BLOGS:
      return {
        ...state,
        selectedBlogs: action.payload,
      };
    case CLEAR_SELECTED_BLOGS:
      return {
        ...state,
        selectedBlogs: [],
      };
    default:
      return state;
  }
};

export default manageBlogReducer; 