import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { useParams } from "react-router-dom";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  console.log(user);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: 20 }}>{user.username}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
