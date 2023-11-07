import "./styles/App.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { handleNotification } from './reducers/notificationReducer'
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";

import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //const [confirmationMessage, setConfirmationMessage] = useState(null);
  //const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  //GET ALL BLOGS FROM SERVER ON PAGE LOAD
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  //SET THE USER IF STORAGE HAS LOGGED IN USER ON PAGE LOAD
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      console.log("logged user found");
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  //IF NO BLOGS FOUND, RETURN NULL
  if (!blogs) {
    return null;
  }

  //ADD A NEW BLOG TO THE LIST
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    //POST METHOD
    blogService
      .create(blogObject)
      .then(() => {
        // Fetch all blogs again to update the blog list
        blogService.getAll().then((updatedBlogs) => {
          setBlogs(updatedBlogs);
          
          //REDUX
          dispatch(handleNotification(`Added "${blogObject.title}" to Bloglist by ${blogObject.author}`, 5, 'success'))
        });
      })
      //CATCH ERROR AND SHOW MESSAGE TO USER
      .catch((error) => {

        //REDUX
        dispatch(handleNotification(`Oops! Addition of '${blogObject.title}' to the BlogList failed`, 5, 'error'));
      });
  };

  //UPDATE THE LIKES AMOUNT WHEN LIKE-BUTTON PUSHED
  const updateLikes = async (id) => {
    console.log("like button pushed!");

    const blogToUpdate = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    try {
      await blogService.update(id, updatedBlog);

      blogService.getAll().then((updatedBlogs) => {
        setBlogs(updatedBlogs);
      });
    } catch (error) {
      console.error("Failed to update likes:", error);

      //REDUX
      dispatch(handleNotification('Failed to update likes', 5, 'error'));
    }
  };

  //REMOVE BLOG WHEN DELETE-BUTTON IS PUSHED
  const deleteBlog = async (id) => {
    console.log("delete button pushed!");
    const blogToDelete = blogs.find((blog) => blog.id === id);

    if (window.confirm(`Remove blog "${blogToDelete.title}" ?`)) {
      try {
        await blogService.remove(id);

        setBlogs(blogs.filter((blog) => blog.id !== id));

        //REDUX
        dispatch(handleNotification(`Deletion succesful`, 5, 'success'))

      } catch (error) {
        console.error("Deletion failed", error);
        
        //REDUX
        dispatch(handleNotification('Deletion failed', 5, 'error'));
      }
    }
  };

  //EVENTHANDLER FOR LOGIN
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log("logging in with", username, password);
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {

      //REDUX
      dispatch(handleNotification('Wrong username of password', 5, 'error'));
    }
  };

  const logOutUser = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    console.log("logged out");
  };

  //FUNCTION FOR SORTING ARRAY BY AMOUNT OF LIKES FIELD
  const sortBlogsByLikes = (array) => {
    return [...array].sort((a, b) => b.likes - a.likes);
  };

  //SORT THE BLOGS ARRAY
  const sortedBlogs = sortBlogsByLikes(blogs);

  //BLOG-FORM COMPONENT WITH 2 DIFFERENT VIEWS
  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const notification = useSelector((state) => state.notification)

  if (user === null) {
    return (
      <div>
        {notification !== null && <Notification />}

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      {notification !== null && <Notification />}
      
      <h2>Blogs</h2>

      <p>{user.username} logged in</p>

      <button className="log-out-button" onClick={logOutUser}>
        logout
      </button>

      {blogForm()}

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

export default App;
