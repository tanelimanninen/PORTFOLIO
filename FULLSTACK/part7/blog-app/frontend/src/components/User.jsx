import { useParams } from "react-router-dom";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  console.log(user);

  return (
    <div>
      <h2>{user.username}</h2>
      {user.blogs.map((blog) => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </div>
  );
};

export default User;
