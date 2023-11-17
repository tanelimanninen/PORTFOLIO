import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const BookList = () => {
    const result = useQuery(ALL_BOOKS, {
        pollInterval: 2000
    })

    if (result.loading)  {
        return <div>loading books...</div>
    }

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
                    {result.data.allBooks.map((b) => (
                        <tr key={b.title}>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookList