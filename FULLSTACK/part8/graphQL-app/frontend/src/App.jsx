import './styles/App.css'
import { 
  Routes,
  Route
} from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from './queries';
import Menu from './components/Menu';
import AuthorList from './components/AuthorList';
import AuthorForm from './components/AuthorForm';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const App = () => {
  const { loading: authorListLoading, error: authorListError } = useQuery(ALL_AUTHORS);

  if (authorListLoading) {
    return <div>Loading authors...</div>;
  }

  if (authorListError) {
    return <div>Error loading authors: {authorListError.message}</div>;
  }

  return (
    <div>
      <Menu />

      <Routes>
        <Route path='/' element={<div><AuthorList /> <AuthorForm /></div>} />
        <Route path='/books' element={<BookList />} />
        <Route path='/add_book' element={<BookForm />} />
      </Routes>
      
    </div>
  )
}

export default App
