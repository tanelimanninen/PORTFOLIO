import Blog from './Blog'

const BlogForm = ({ logOutUser, addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange, user, blogs }) => {
    return (
        <div>
            <h2>Blogs</h2>

            <p>{user.username} logged in</p>

            <button className='log-out-button' onClick={logOutUser}>logout</button>

            <h3>Create a new blog</h3>

            <form onSubmit={addBlog}>
                <div>
                    Title:                    
                    <input 
                        value={newTitle} 
                        type='text' 
                        name='Title' 
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    Author:                    
                    <input
                    value={newAuthor}
                    type='text' 
                    name='Author'
                    onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    Url:                    
                    <input
                    value={newUrl}
                    type='text'
                    name='Url'
                    onChange={handleUrlChange}
                    />
                </div>
                <button className='create-button' type="submit">Create</button>
            </form>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogForm