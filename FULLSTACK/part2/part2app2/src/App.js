import Search from './components/Search';
import Form from './components/Form';
import List from './components/List';
import personService from './services/persons'
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //GET THE JSON-DATA FROM SERVER
  useEffect(() => {
    //console.log('effect')
    //GET METHOD
    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })
  })

  const filteredPersons = persons.filter(person => 
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.number.includes(search)
    )
  
  //FUNCTION TO ADD NEW PERSON TO LIST
  const addPerson = (event) => {
    event.preventDefault()
    //console.log(event.target)
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      window.alert(`Can't add ${newName}, because the name is already in the phonebook.`)
    } else if (persons.some(person => person.number === newNumber)) {
        window.alert(`Can't add ${newNumber}, because the number is already in the phonebook.`)
    } else if (newName === '') {
        window.alert(`Can't add empty values!`)
    } else if (newNumber === '') {
      window.alert(`Can't add empty values!`)
    } else {
        //POST METHOD
        personService
          .create(personObject)
          .then(returnedPerson => {
            console.log(personObject)
            //console.log(response)
            setPersons(persons.concat(returnedPerson))
            console.log(returnedPerson)
            setNewName('')
            setNewNumber('')
          })
    }
  }

  //FUNCTION TO DELETE A PERSON
  const deletePerson = (id) => {
    console.log(id)
    const personToDelete = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)

    //DELETE METHOD
    if (confirmDelete) {
      personService
        .deleteSelected(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
      console.log(`Contact ${personToDelete.name} deleted`)
    }
  }

  //EVENT HANDLERS
  const handleSearchChange = (event) => {
    //console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
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
      <List 
        deletePerson={deletePerson}
        filteredPersons={filteredPersons}
      />
    </div>
  );
}

export default App;
