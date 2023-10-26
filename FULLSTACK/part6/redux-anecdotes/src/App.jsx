import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useSelector } from 'react-redux'

import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      dispatch(initializeAnecdotes())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const notification = useSelector((state) => state.notification)

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification !== null && <Notification />}
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}


export default App