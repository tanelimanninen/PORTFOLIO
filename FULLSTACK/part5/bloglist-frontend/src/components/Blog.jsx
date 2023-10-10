import { useState } from "react"

const Blog = ({ blog, updateLikes }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  //CHANGE THE VISIBILTY STATE
  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div className="single-blog">
      <div>
        {blog.title} - {blog.author}
        <button className="view-button" onClick={toggleDetails}>{detailsVisible ? 'Hide' : 'View'}</button>
      </div>
      {detailsVisible && (
        <ul>
          <li>URL: {blog.url}</li>
          <li>Likes: {blog.likes} <button className="like-button" onClick={() => updateLikes(blog.id)} >Like</button></li>
          <li>Author: {blog.author}</li>
        </ul>
       )}
    </div>
  )
}

export default Blog