import "./styles/App.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
      setUser(user);
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
      dispatch(handleNotification("Wrong username of password", 5, "error"));
    }
  };

  const logOutUser = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    console.log("logged out");
  };

  //BLOG-FORM COMPONENT WITH 2 DIFFERENT VIEWS
  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const notification = useSelector((state) => state.notification);

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

      <BlogList user={user} />
    </div>
  );
};

export default App;
