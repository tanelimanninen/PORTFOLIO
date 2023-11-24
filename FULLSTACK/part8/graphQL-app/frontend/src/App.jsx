import './styles/App.css'
import { useState } from 'react';
import { 
  Routes,
  Route
} from 'react-router-dom'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries';

import LoginForm from './components/LoginForm';
import Menu from './components/Menu';
import AuthorList from './components/AuthorList';
import AuthorForm from './components/AuthorForm';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import RecommendedList from './components/RecommendedList';
import Notification from './components/Notification';


//FUNCTION TO MANIPULATING CACHE
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const { loading: authorListLoading, error: authorListError } = useQuery(ALL_AUTHORS);
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)

      const addedBook = data.data.bookAdded
      notify(`"${addedBook.title}" added!`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
        />
      </div>
    )
  }

  if (authorListLoading) {
    return <div>Loading authors...</div>;
  }

  if (authorListError) {
    return <div>Error loading authors: {authorListError.message}</div>;
  }


  return (
    <div>
      <Menu />
      <button onClick={logout}>logout</button>
      <Notification setMessage={message} />

      <Routes>
        <Route path='/' element={<div><AuthorList /> <AuthorForm /></div>} />
        <Route path='/books' element={<BookList />} />
        <Route path='/add_book' element={<BookForm />} />
        <Route path='/recommendations' element={<RecommendedList /> } />
      </Routes>
      
    </div>
  )
}

export default App
