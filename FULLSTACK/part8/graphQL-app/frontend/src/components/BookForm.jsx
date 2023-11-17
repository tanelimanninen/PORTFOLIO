import { useState, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { 
    useNavigate
  } from 'react-router-dom'
import { CREATE_BOOK } from '../queries'

const BookForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genres, setGenres] = useState([])
    const genreInputRef = useRef(null);

    const [ createBook ] = useMutation(CREATE_BOOK)

    const navigate = useNavigate()

    const addGenre = (event) => {
        event.preventDefault();

        const genreValue = genreInputRef.current.value.trim();

        if (genreValue !== '') {
            setGenres([...genres, genreValue]);
            genreInputRef.current.value = '';
        } else {
            console.log('input value can not be empty!')
        }
    }

    const submitBook = async (event) => {
        event.preventDefault()

        const yearAsInt = parseInt(published, 10);

        createBook({ 
            variables: { 
                title,
                author,
                published: yearAsInt,
                genres 
            },
        })

        //CLEAR ALL INPUT AND GENRE-ARRAY FIELDS
        setTitle('')
        setAuthor('')
        setPublished('')
        setGenres([])

        //NAVIGATE TO BOOKS-LIST VIEW
        navigate('/books')
    }

    return (
        <div>
            <h2>Add a new book</h2>

            <form onSubmit={submitBook}>
                <div>
                    Title:
                    <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    Author:
                    <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    Year:
                    <input value={published} onChange={({ target }) => setPublished(target.value)} />
                </div>
                <div>
                    <button onClick={addGenre}>Add</button>
                    <input ref={genreInputRef} />
                </div>
                <div>
                    Genres: {genres.join(', ')}
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default BookForm