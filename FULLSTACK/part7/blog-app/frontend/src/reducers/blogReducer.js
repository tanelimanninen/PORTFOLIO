import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    //ACTION CREATOR 1
    setBlogs(state, action) {
      return action.payload;
    },
    //ACTION CREATOR 2
    appendBlog(state, action) {
      state.push(action.payload);
    },
    //ACTION CREATOR 3
    handleLikes(state, action) {
      const id = action.payload.id;
      //FIND BLOG WITH MATCHING ID
      const blogToLike = state.find((blog) => blog.id === id);

      if (blogToLike) {
        //CREATE NEW STATE WITH UPDATED LIKES
        return state.map((blog) =>
          blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog,
        );
      }
    },
    //ACTION CREATOR 4
    removeBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
    //ACTION CREATOR 5 tällä hetkellä turha
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.blogId
          ? { ...blog, comments: [...blog.comments, action.payload.comment] }
          : blog,
      );
    },
  },
});

export const {
  setBlogs,
  appendBlog,
  handleLikes,
  removeBlog,
  setComments,
  appendComment,
} = blogSlice.actions;

//ASYNC ACTION 1 (SHOW ALL DATA)
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

//ASYNC ACTION 2 (CREATE NEW DATA)
export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

//ASYNC ACTION 3 (UPDATE DATA)
export const addLike = (id) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id);
    dispatch(handleLikes(updatedBlog));
  };
};

//ASYNC ACTION 4 (REMOVE DATA)
export const cancelBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog({ id }));
  };
};

//ASYNC ACTION 5 (GET COMMENTS) tällä hetkellä turha
export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id);
    dispatch(setComments(comments));
  };
};

//ASYNC FUNTION 6 (CREATE COMMENT)
export const makeComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(id, comment);
    dispatch(appendComment(newComment));
  };
};

export default blogSlice.reducer;
