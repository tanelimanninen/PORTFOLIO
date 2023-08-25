import Search from './components/Search';
import Form from './components/Form';
import List from './components/List';
import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const filteredPersons = persons.filter(person => 
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.number.includes(search)
    )

  const addPerson = (event) => {
    event.preventDefault()
    console.log(event.target)
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      window.alert(`Can't add ${newName}, because the name is already in the phonebook.`)
    } else if (persons.some(person => person.number === newNumber)) {
      window.alert(`Can't add ${newNumber}, because the number is already in the phonebook.`)
    } else {
      setPersons(persons.concat(personObject))
    }
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange}/>
      <h3>Add a new contact</h3>
      <Form 
        addPerson={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <List filteredPersons={filteredPersons} />
    </div>
  );
}

export default App;
