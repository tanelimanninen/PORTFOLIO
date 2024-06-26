import  { useField } from './hooks/index'
import { useState } from 'react'
import { 
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate
} from 'react-router-dom'


//COMPONENTS
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">Anecdotes</Link>
      <Link style={padding} to="/create">Create New</Link>
      <Link style={padding} to="/about">About</Link>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  const margins = {
    marginBottom: 5
  }

  return (
    <div>
      <h3>{anecdote.content}</h3>
      <div style={margins}>Votes: {anecdote.votes}</div>
      <div style={margins}>For more info: <a href="url">{anecdote.info}</a></div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <div>{notification}</div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is a story with a point.</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => {
  const margins = {
    marginTop: 25
  }

  return (
    <div style={margins}>
      Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  )
  
}

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    //NAVIGATE TO LIST VIEW
    navigate('/')
  }

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
            {...content}
          />
        </div>
        <div>
          author
          <input
            {...author}
          />
        </div>
        <div>
          url for more info
          <input
            {...info}
          />
        </div>
        <button>create</button>
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    //NOTIFICATE USER IN 5s
    setNotification(`New anecdote "${anecdote.content}" created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : <null></null>

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />

      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
