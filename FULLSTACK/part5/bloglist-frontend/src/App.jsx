import './styles/App.css'
import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
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

  //IF NO BLOGS FOUND, RETURN NULL
  if (!blogs) { 
    return null 
  }

  //ADD A NEW BLOG TO THE LIST
  const addBlog = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        //AFTER ADDITION EMPTY INPUT VALUES
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

        //CONFIRM THE USER THAT ADDITION IS SUCCESFUL
        setConfirmationMessage(`Added ${newTitle} to the BlogList, by ${newAuthor}`)
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 4000)
      })
      //CATCH ERROR AND SHOW MESSAGE TO USER
      .catch(error => {
        setErrorMessage(`Oops! Addition of ${newTitle} to the BlogList failed`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 4000)
      })
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

  //EVENT HANDLERS FOR BLOG INPUT FIELDS
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
 
  const logOutUser = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    console.log('logged out')
  }

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

      <BlogForm
        logOutUser={logOutUser}
        addBlog={addBlog}
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        newAuthor={newAuthor}
        handleAuthorChange={handleAuthorChange}
        newUrl={newUrl}
        handleUrlChange={handleUrlChange}
        user={user}
        blogs={blogs} 
      />
    </div>
  )
}

export default App