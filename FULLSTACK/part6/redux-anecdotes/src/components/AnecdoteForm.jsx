import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { handleNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
    
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        
        dispatch(handleNotification(`Added "${content}" to list`, 5))
    }

    return (
        <form onSubmit={addAnecdote}>
            <div>
                <input name='anecdote' />
                <button type='submit'>
                    create
                </button>
            </div>
            
        </form>
    )
}

export default AnecdoteForm