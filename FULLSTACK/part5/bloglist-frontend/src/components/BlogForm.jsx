import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [newUrl, setNewUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })

        setNewTitle("")
        setNewAuthor("")
        setNewUrl("")
    }

    return (
        <div>
            <h3>Create a new blog</h3>

            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input
                        value={newTitle}
                        type='text'
                        name='Title'
                        onChange={event => setNewTitle(event.target.value)}
                        placeholder='write title here'
                    />
                </div>
                <div>
                    Author:
                    <input
                        value={newAuthor}
                        type='text'
                        name='Author'
                        onChange={event => setNewAuthor(event.target.value)}
                        placeholder='write author here'
                    />
                </div>
                <div>
                    Url:
                    <input
                        value={newUrl}
                        type='text'
                        name='Url'
                        onChange={event => setNewUrl(event.target.value)}
                        placeholder='write url here'
                    />
                </div>
                <button className='create-button' type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm