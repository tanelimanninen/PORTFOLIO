import { useState } from "react"

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
    const [detailsVisible, setDetailsVisible] = useState(false)
    //CHANGE THE VISIBILTY STATE
    const toggleDetails = () => {
        setDetailsVisible(!detailsVisible)
    }

    //CHECK IF USER CAN DELETE A BLOG
    const showDeleteButton = () => {
        if (!user) {
            return false
        }
        return blog.user.username === user.username
    }

    return (
        <div className="single-blog">
            <div>
                {blog.title} - {blog.author}
                <button className="view-button" onClick={toggleDetails}>{detailsVisible ? "Hide" : "View"}</button>
            </div>
            {detailsVisible && (
                <div>
                    <ul>
                        <li>URL: {blog.url}</li>
                        <li>Likes: {blog.likes} <button className="like-button" onClick={() => updateLikes(blog.id)} >Like</button></li>
                        <li>Author: {blog.author}</li>
                    </ul>
                    {showDeleteButton() && (
                        <button className="delete-button" onClick={() => deleteBlog(blog.id)}>Delete</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog