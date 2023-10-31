import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote, getAnecdotes } from '../requests'


const AnecdoteList = () => {
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

export default AnecdoteList

