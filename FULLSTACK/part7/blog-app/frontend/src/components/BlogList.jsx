import { useDispatch, useSelector } from "react-redux";
import { addLike, cancelBlog } from "../reducers/blogReducer";
import { handleNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import Blog from "./Blog";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  //REDUX UPDATE LIKES (PUT)
  const updateLikes = async (id) => {
    console.log("Like button pushed! ", id);

    try {
      dispatch(addLike(id));
      //SHOW SUCCESS MESSAGE
      dispatch(handleNotification("Blog liked!", 5, "success"));
    } catch (error) {
      console.error("Failed to update likes:", error);
      //SHOW ERROR MESSAGE
      dispatch(handleNotification("Failed to update likes", 5, "error"));
    }
  };

  //REMOVE BLOG WHEN DELETE-BUTTON IS PUSHED
  const deleteBlog = async (id) => {
    console.log("delete button pushed!", id);

    if (window.confirm("Remove blog?")) {
      try {
        dispatch(cancelBlog(id));
        //SHOW SUCCESS MESSAGE
        dispatch(handleNotification("Blog deleted successfully", 5, "success"));
      } catch (error) {
        console.error("Deletion failed", error);
        //SHOW ERROR MESSAGE
        dispatch(handleNotification("Deletion failed", 5, "error"));
      }
    }
  };

  //FUNCTION FOR SORTING ARRAY BY AMOUNT OF LIKES FIELD
  const sortBlogsByLikes = (array) => {
    return [...array].sort((a, b) => b.likes - a.likes);
  };

  //SORT THE BLOGS ARRAY
  const sortedBlogs = sortBlogsByLikes(blogs);

  //IF NO BLOGS FOUND, RETURN NULL
  if (!blogs) {
    return null;
  }

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;
