import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { handleNotification, /*unSetNotification*/ } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    //DISPATCH NEW VOTE AND NOTIFICATION
    const vote = async (id, content) => {
        console.log('vote', id)
        console.log(content)

        dispatch(addVote(id, content))
        
        dispatch(handleNotification(`Vote added to "${content}"`, 5))
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
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList