import { useQuery } from '@apollo/client';
import { GET_USER, ALL_BOOKS } from '../queries';

const Books = ({ favoriteGenre }) => {
    const { loading, error, data } = useQuery(ALL_BOOKS, {
        pollInterval: 2000
    })

    if (loading)  {
        return <div>loading books...</div>
    }

    if (error) {
        return <div>Error loading books: {error.message}</div>;
    }

    const filteredBooks = data.allBooks.filter(
        (b) => b.genres.includes(favoriteGenre)
    );

    return (
        <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publish Year</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((b) => (
                        <tr key={b.title}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}

const RecommendedList = () => {
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);

    //console.log(userData)

    if (userLoading) {
        return (
            <div>Loading...</div>
        )
    } 

    if (userError) {
        return (
            <div>Error: {userError.message}</div>
        )
    }

    const userName = userData.me.username
    const favoriteGenre = userData.me.favoriteGenre;

    return (
        <div>
            <h2>Recommendations</h2>

            <h4>{userName}</h4>
            <p>Books based on favourite genre: <b>{favoriteGenre}</b></p>

            <Books favoriteGenre={favoriteGenre} />
        </div>
    )
}

export default RecommendedList