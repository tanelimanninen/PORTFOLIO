import { useSelector, useDispatch } from 'react-redux'
import { handleVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    //DISPATCH NEW VOTE
    const vote = (id) => {
        console.log('vote', id)
    
        dispatch(handleVotes(id))
    }

    //FUNCTION FOR SORTING ARRAYS BY AMOUNT OF VOTES FIELD
    const sortByVotes = (array) => {
        return [...array].sort((a, b) => b.votes - a.votes)
    }

    //SORT THE ANECDOTES ARRAY
    const sortedAnecdotes = sortByVotes(anecdotes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList