import "./styles/App.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { setUser, logoutUser } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

import blogService from "./services/blogs";

const App = () => {
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  //REDUX (GET ALL BLOGS FROM SERVER)
  useEffect(() => {
    blogService;
    dispatch(initializeBlogs());
  }, []);

  //SET THE USER IF STORAGE HAS LOGGED IN USER ON PAGE LOAD
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      console.log("logged user found");
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  // ADD A NEW BLOG TO THE LIST
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    // REDUX (POST)
    dispatch(createBlog(blogObject))
      .then(() => {
        //SHOW SUCCESS MESSAGE
        dispatch(
          handleNotification(
            `Added "${blogObject.title}" to Bloglist by ${blogObject.author}`,
            5,
            "success",
          ),
        );

        // FETCH ALL DATA AGAIN WITH UPDATES
        dispatch(initializeBlogs());
      })
      .catch((error) => {
        //SHOW ERROR MESSAGE
        dispatch(
          handleNotification(
            `Oops! Addition of '${blogObject.title}' to the BlogList failed`,
            5,
            "error",
          ),
        );
      });
  };

  const logOutUser = () => {
    //LOG OUT USER
    dispatch(logoutUser());
  };

  //BLOG-FORM COMPONENT WITH 2 DIFFERENT VIEWS
  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  if (user === null) {
    return (
      <div>
        {notification !== null && <Notification />}

        <LoginForm />
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

      <BlogList user={user} />
    </div>
  );
};

export default App;
