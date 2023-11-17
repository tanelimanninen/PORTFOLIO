/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';

const AuthorList = () => {
    const result = useQuery(ALL_AUTHORS, {
        pollInterval: 2000
    })
    
    if (result.loading)  {
        return <div>loading authors...</div>
    }

    return (
        <div>
            <h2>Authors</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birthyear</th>
                        <th>Books</th>
                    </tr>
                </thead>
                <tbody>
                    {result.data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born !== null ? a.born : '-'}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AuthorList