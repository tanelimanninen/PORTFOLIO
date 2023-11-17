import './styles/App.css'
import { 
  Routes,
  Route
} from 'react-router-dom'
import Menu from './components/Menu';
import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const App = () => {
  return (
    <div>
      <Menu />

      <Routes>
        <Route path='/' element={<AuthorList />} />
        <Route path='/books' element={<BookList />} />
        <Route path='/add_book' element={<BookForm />} />
      </Routes>
      
    </div>
  )
}

export default App
