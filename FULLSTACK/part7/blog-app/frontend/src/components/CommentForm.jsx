import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { makeComment, initializeBlogs } from "../reducers/blogReducer";
import { handleNotification } from "../reducers/notificationReducer";

const CommentForm = ({ blog }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = async () => {
    if (commentText.trim() !== "") {
      try {
        await dispatch(makeComment(blog.id, commentText));
        setCommentText("");
        //SHOW SUCCESS MESSAGE
        dispatch(handleNotification("Added new comment", 5, "success"));
        //GET ALL BLOGS WITH NEW COMMENT
        dispatch(initializeBlogs());
      } catch (error) {
        console.error("Failed to create comment:", error);
        //SHOW ERROR MESSAGE
        dispatch(handleNotification("Failed to add comment", 5, "error"));
      }
    } else {
      console.log("Comment text is empty");
      //SHOW ERROR MESSAGE
      dispatch(handleNotification("Comment text is empty", 5, "error"));
    }
  };

  return (
    <div className="comment-form">
      <div>
        <TextField
          label="comment"
          type="comment"
          value={commentText}
          onChange={handleCommentChange}
        />
      </div>

      <div>
        <Button
          style={{ marginTop: 5 }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
