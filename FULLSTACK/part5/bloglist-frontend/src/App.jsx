import './styles/App.css'
import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //GET ALL BLOGS FROM SERVER ON PAGE LOAD
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })  
  }, [])

  //SET THE USER IF STORAGE HAS LOGGED IN USER ON PAGE LOAD
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      console.log('logged user found')
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  //IF NO BLOGS FOUND, RETURN NULL
  if (!blogs) { 
    return null 
  }

  //ADD A NEW BLOG TO THE LIST
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    //POST METHOD
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        //CONFIRM THE USER THAT ADDITION IS SUCCESFUL
        setConfirmationMessage(`Added '${blogObject.title}' to the BlogList by ${blogObject.author}`)
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 4000)
      })
      //CATCH ERROR AND SHOW MESSAGE TO USER
      .catch(error => {
        setErrorMessage(`Oops! Addition of '${blogObject.title}' to the BlogList failed`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 4000)
      })
  }

  //UPDATE THE LIKES AMOUNT WHEN LIKE-BUTTON PUSHED
  const updateLikes = async (id) => {
    console.log('like button pushed!')

    const blogToUpdate = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map(blog =>
        blog.id === id ? returnedBlog : blog
      ));
    } catch (error) {
      // Handle error
      console.error('Failed to update likes:', error);
    }
  }

  //EVENTHANDLER FOR LOGIN
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log('logging in with', username, password)
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const logOutUser = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    console.log('logged out')
  }

  //BLOG-FORM COMPONENT WITH 2 DIFFERENT VIEWS
  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm 
        createBlog={addBlog}
      />
    </Togglable>
  )


  if (user === null) {
    return (
      <div>
        
        <Notification message={errorMessage} isSuccess={false} />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={confirmationMessage} isSuccess={true} />
      <Notification message={errorMessage} isSuccess={false} />

      <h2>Blogs</h2>

      <p>{user.username} logged in</p>

      <button className='log-out-button' onClick={logOutUser}>logout</button>
      
      {blogForm()}
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />
      )}
    </div>
  )
}

export default App