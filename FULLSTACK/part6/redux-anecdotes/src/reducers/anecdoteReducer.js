import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    //ACTION CREATOR 1
    handleVotes(state, action) {
      const id = action.payload.id
      // FIND THE ANECDOTE WITH CORRECT ID
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)

      if (anecdoteToVote) {
        // CREATE NEW STATE WITH UPDATED VOTES
        return state.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        )
      }
    },
    //ACTION CREATOR 2
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    //ACTION CREATOR 3
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { handleVotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

//ASYNC ACTION FOR FOR DATA INTIALIZITION
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

//ASYNC ACTION FOR ADDING VOTE
export const addVote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    dispatch(handleVotes(updatedAnecdote))
  }
}

//ASYNC ACTION FOR CREATING NEW DATA
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer