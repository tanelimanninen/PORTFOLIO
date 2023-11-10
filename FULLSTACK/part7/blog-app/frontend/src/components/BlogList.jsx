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

      {sortedBlogs.map((blog) => (
        <div key={blog.id} id="single-blog" className="single-blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}, by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
