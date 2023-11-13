import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  //FUNCTION FOR SORTING ARRAY BY AMOUNT OF LIKES FIELD
  const sortBlogsByLikes = (array) => {
    return [...array].sort((a, b) => b.likes - a.likes);
  };

  //SORT THE BLOGS ARRAY
  const sortedBlogs = sortBlogsByLikes(blogs);

  //IF NO BLOGS FOUND, RETURN NULL
  if (!blogs) {
    return null;
  }

  return (
    <div>
      <h2>Blogs</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
