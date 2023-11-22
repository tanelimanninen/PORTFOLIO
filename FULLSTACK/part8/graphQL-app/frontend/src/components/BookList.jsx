import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

import GenreButtons from './GenreButtons';

const BookList = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);

    const { loading, error, data } = useQuery(ALL_BOOKS, {
        pollInterval: 2000
    })


    if (loading)  {
        return <div>loading books...</div>
    }

    if (error) {
        return <div>Error loading books: {error.message}</div>;
    }

    const genres = [...new Set(data.allBooks.flatMap((book) => book.genres))];


    return (
        <div>
            <h2>Books</h2>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publish Year</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allBooks
                        .filter((book) => !selectedGenre || book.genres.includes(selectedGenre))
                        .map((b) => (
                            <tr key={b.title}>
                                <td>{b.title}</td>
                                <td>{b.author.name}</td>
                                <td>{b.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            
            <GenreButtons
                genres={genres}
                onGenreSelected={setSelectedGenre}
                onShowAll={() => setSelectedGenre(null)}
            />
        </div>
    )
}

export default BookList