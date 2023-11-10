import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { addLike, cancelBlog, initializeBlogs } from "../reducers/blogReducer";
import { handleNotification } from "../reducers/notificationReducer";

import CommentForm from "./CommentForm";

const Blog = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  console.log(blog);

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
        //NAVIGATE BACK TO LIST VIEW
        navigate("/");
      } catch (error) {
        console.error("Deletion failed", error);
        //SHOW ERROR MESSAGE
        dispatch(handleNotification("Deletion failed", 5, "error"));
      }
    }
  };

  //CHECK IF USER CAN DELETE A BLOG
  const showDeleteButton = () => {
    if (!user) {
      return false;
    }
    return blog.user.username === user.username;
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        {blog.title} - - - {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>

      <p>
        Likes: {blog.likes}
        <button
          id="like-button"
          className="like-button"
          onClick={() => updateLikes(blog.id)}
        >
          Like
        </button>
      </p>

      <p>Added by {blog.user.username}</p>

      {showDeleteButton() && (
        <button
          id="delete-button"
          className="delete-button"
          onClick={() => deleteBlog(blog.id)}
        >
          Delete
        </button>
      )}

      <h3>Comments</h3>

      <CommentForm blog={blog} />

      {blog.comments?.length > 0 ? (
        blog.comments.map((comment, index) => <p key={index}>{comment}</p>)
      ) : (
        <p>No added comments.</p>
      )}
    </div>
  );
};

export default Blog;
