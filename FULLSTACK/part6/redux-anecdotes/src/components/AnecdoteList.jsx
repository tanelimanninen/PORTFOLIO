import { useSelector, useDispatch } from 'react-redux'
import { handleVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    //DISPATCH NEW VOTE
    const vote = (id) => {
        console.log('vote', id)
        dispatch(handleVotes({ id }))
    }

    //FUNCTION FOR SORTING ARRAYS BY AMOUNT OF VOTES FIELD
    const sortByVotes = (array) => {
        return [...array].sort((a, b) => b.votes - a.votes)
    }

    //SORT THE ANECDOTES ARRAY
    const sortedAnecdotes = sortByVotes(anecdotes)

    //FILTER THE SORTED ARRAY BY THE FILTER STATE
    const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
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