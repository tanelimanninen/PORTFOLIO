import { useQuery } from '@tanstack/react-query'

import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  //IN PROGRESS
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const { status, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  //SHOW MESSAGE WHEN LOADING DATA
  if (status === 'pending') {
    return <span>Loading...</span>
  }

  //SHOW MESSAGE WHEN ERROR LOADING DATA
  if (status === 'error') {
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
