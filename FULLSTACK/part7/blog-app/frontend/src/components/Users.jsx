import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
    /*const users = useSelector((state) => state.users);*/
    console.log(users)

    return (
        <div>
            <h2>Users</h2>

            {users.map((user) => (
                <p key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.username} - - - Blogs Total: {user.blogs.length}</Link>
                </p>
            ))}

            <table>
                <tr>
                    <th>Username</th>
                    <th>Amount of Blogs</th>
                </tr>
                <td>
                    {users.map((user) => (
                        <p key={user.id}>
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </p>
                    ))}
                </td>
                <td>
                    {users.map((user) => (
                            <p key={user.id}>
                                {user.blogs.length}
                            </p>
                    ))}
                </td>
            </table>
        </div>
    )
}

export default Users