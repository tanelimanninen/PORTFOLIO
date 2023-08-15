import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [favourite, setFavourite] = useState('No votes yet.')
  const [maxValue, setMaxValue] = useState()

  //console.log(votes)

  //FUNCTION: MAKE A NEW ANECDOTE
  const newAnecdote = (max) => {
    const random = Math.floor(Math.random() * max)
    //console.log(random)
    return (
      setSelected(random)
    )
  }

  //FUNCTION: ADD VOTES TO ANECDOTE
  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log(newVotes)
    setVotes(newVotes)

    //GET THE ANECDOTE WITH MOST VOTES WITH INDEX
    const indexOfFavourite = newVotes.indexOf(Math.max(...newVotes))
    
    //THIS ISN'T NEEDED IN THE APPLICATION, ONLY FOR OBSERVATION IN THE CONSOLE
    const valueOfFavourite = Math.max(...newVotes)
    console.log(valueOfFavourite)

    setFavourite(anecdotes[indexOfFavourite])
    setMaxValue(indexOfFavourite)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes.</p>
      <Button handleClick={addVote} text='Vote' />
      <Button handleClick={() => newAnecdote(anecdotes.length)} text='Next anecdote'/>
      <Header text='Favourite with the most votes:' />
      <p>{favourite}</p>
      <p>Currently has {votes[maxValue]} votes.</p>
    </div>
  )
}

//HEADER COMPONENT
const Header = (props) => <h1>{props.text}</h1>

//BUTTON COMPONENT
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

export default App
