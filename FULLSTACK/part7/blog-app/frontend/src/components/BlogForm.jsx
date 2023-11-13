import { TextField, Button } from "@mui/material";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h3>Create a new blog</h3>

      <form onSubmit={addBlog}>
        <div>
          <TextField
            id="blog-title"
            label="title"
            type="title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          <TextField
            id="blog-author"
            label="author"
            type="author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          <TextField
            id="blog-url"
            label="url"
            type="text"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <div>
          <Button
            style={{ marginTop: 5, marginBottom: 5 }}
            id="create-button"
            variant="contained"
            color="primary"
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;

/*
          <div>
          Title:
          <input
            id="blog-title"
            value={newTitle}
            type="text"
            name="Title"
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          Author:
          <input
            id="blog-author"
            value={newAuthor}
            type="text"
            name="Author"
            onChange={(event) => setNewAuthor(event.target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          Url:
          <input
            id="blog-url"
            value={newUrl}
            type="text"
            name="Url"
            onChange={(event) => setNewUrl(event.target.value)}
            placeholder="write url here"
          />
        </div>
        <button id="create-button" className="create-button" type="submit">
          Create
        </button>
*/
