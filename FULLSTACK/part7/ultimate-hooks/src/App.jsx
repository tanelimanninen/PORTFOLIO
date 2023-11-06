import { useField, useResource } from './hooks/index'
import { useEffect } from 'react'


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  //FETCH THE DATA ON PAGE LOAD
  useEffect(() => {
    //NOTES
    noteService.getAll()

    //PERSONS
    personService.getAll()
  }, [])

  //NEW DATA FUNCTIONS
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    .then(() => {
      content.onChange({ target: { value: '' } })
    })
    .catch((error) => {
      console.error('Error creating note:', error);
    })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    .then(() => {
      name.onChange({ target: { value: '' } })
      number.onChange({ target: { value: '' } })
    })
    .catch((error) => {
      console.error('Error creating person:', error);
    })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App