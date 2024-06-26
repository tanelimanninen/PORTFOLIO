import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote, getAnecdotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'


const App = () => {
  const queryClient = useQueryClient()

  //MUTATION FUNCTION
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log(`Adding vote to ${anecdote.id}`)

    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const { status, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
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