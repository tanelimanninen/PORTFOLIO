//CSS STYLES
import "./styles/App.css";
//MATERIAL UI
import { Container, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff1744",
    },
    secondary: {
      main: "#ff1744",
    },
  },
});

//REACT LIBRARY IMPORTS
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
//REDUX REDUCERS
import { handleNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { setUser, logoutUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
//COMPONENTS
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import Menu from "./components/Menu";
//SERVER SERVICES
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const notification = useSelector((state) => state.notification);

  console.log(users);
  const dispatch = useDispatch();

  //REDUX (GET ALL BLOGS FROM SERVER)
  useEffect(() => {
    blogService;
    dispatch(initializeBlogs());
  }, []);

  //REDUX (GET ALL USERS FROM SERVER)
  useEffect(() => {
    userService;
    dispatch(initializeUsers());
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
      <Container>
        {notification !== null && <Notification />}

        <LoginForm />
      </Container>
    );
  }

  return (
    <Container>
      <Menu />

      {notification !== null && <Notification />}

      <h1>Blogs</h1>

      <p>{user.username} logged in</p>

      <ThemeProvider theme={theme}>
        <Button
          style={{ marginBottom: 5 }}
          variant="contained"
          color="secondary"
          onClick={logOutUser}
        >
          Log Out
        </Button>
      </ThemeProvider>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {blogForm()} <BlogList />
            </div>
          }
        />
        <Route path="/blogs/:id" element={<Blog user={user} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
      </Routes>
    </Container>
  );
};

export default App;
