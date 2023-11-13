import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc107',
    },
    secondary: {
      main: '#ff1744',
    },
  },
});

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
        await dispatch(cancelBlog(id));
        //SHOW SUCCESS MESSAGE
        dispatch(handleNotification("Blog deleted successfully", 5, "success"));
        //NAVIGATE BACK TO LIST VIEW
        navigate("/");
        //GET ALL BLOGS WITH DATA AFTER DELETION
        //dispatch(initializeBlogs());
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

        <ThemeProvider theme={theme}>
          <Button style={{ marginLeft: 5 }} variant="contained" color="primary" onClick={() => updateLikes(blog.id)}>Like</Button>
        </ThemeProvider>
      </p>

      <p>Added by {blog.user.username}</p>

      {showDeleteButton() && (
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="secondary" onClick={() => deleteBlog(blog.id)}>Delete</Button>
        </ThemeProvider>
      )}

      <h3>Comments</h3>

      <CommentForm blog={blog} />

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          {blog.comments?.length > 0 ? (
            blog.comments.map((comment, index) => (
            <TableRow key={index}>
              <TableCell>{comment}</TableCell>
            </TableRow>
            ))
          )  : (
            <TableRow>
              <TableCell>No added comments.</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blog;
