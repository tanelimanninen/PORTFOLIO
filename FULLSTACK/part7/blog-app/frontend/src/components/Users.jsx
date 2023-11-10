import { Link } from "react-router-dom";

const Users = ({ users }) => {
  console.log(users);

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Amount of Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

/*
<div>
            <h2>Users</h2>

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
*/
