import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

//GET ALL
export const getAnecdotes = () =>
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)

//POST
export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

//PUT
export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)