import './styles/App.css'
import { useState } from 'react';
import { 
  Routes,
  Route
} from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS } from './queries';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';
import AuthorList from './components/AuthorList';
import AuthorForm from './components/AuthorForm';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import RecommendedList from './components/RecommendedList';

const App = () => {
  const [token, setToken] = useState(null)
  const { loading: authorListLoading, error: authorListError } = useQuery(ALL_AUTHORS);
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
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
