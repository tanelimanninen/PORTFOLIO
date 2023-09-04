import Search from './components/Search';
import Form from './components/Form';
import List from './components/List';
import personService from './services/persons'
import Notification from './components/Notification';
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState(null)

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

    //FIND IF PERSON NAME ALREADY EXISTS
    const existingPerson = persons.find(person => person.name === newName)
    //FIND IF PERSON NUMBER ALREADY EXISTS
    const existingNumber = persons.find(person => person.number === newNumber)

    //CONDITION 1 = IF NAME & NUMBER ARE BOTH ALREADY IN PHONEBOOK
    if (existingPerson && existingNumber) {
      window.alert(`Can't add ${newName}, because the name and number is already in the phonebook.`)
    } 
    //CONDITION 2 = IF NAME IS ALREADY IN THE PHONEBOOK BUT NUMBER ISN'T
    else if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already in the phonebook. Do you want to update the number?`)
      
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber}
        
        //PUT METHOD
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id === returnedPerson.id ? returnedPerson : person)))
            setNewName('')
            setNewNumber('')
            //CONFIRM THE USER THAT UPDATE IS SUCCESFUL
            setConfirmationMessage(`'${newNumber}' updated to ${newName}`)
            setTimeout(() => {
              setConfirmationMessage(null)
            }, 4000)
          })
          .catch(error => {
            console.error('Error updating person:', error);
            // Handle errors, such as showing an error message to the user
          })
      }
    }
    //CONDITION 3 = IF NAME OR NUMBER VALUE IS EMPTY
    else if (newName === '' || newNumber === '') {
        window.alert(`Can't add empty values!`)
    } 
    //CONDITION 4 = IF NAME AND NUMBER DOESN'T EXIST YET
    else {
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
            //CONFIRM THE USER THAT UPDATE IS SUCCESFUL
            setConfirmationMessage(`Added ${newName} to the phonebook`)
            setTimeout(() => {
              setConfirmationMessage(null)
            }, 4000)
          })
          .catch(error => {
            console.error('Error creating person:', error);
            // Handle errors, such as showing an error message to the user
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
          //CONFIRM THE USER THAT UPDATE IS SUCCESFUL
          setConfirmationMessage(`Deleted ${personToDelete.name} from the phonebook`)
          setTimeout(() => {
            setConfirmationMessage(null)
          }, 4000)
        })
      //console.log(`Contact ${personToDelete.name} deleted`)
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
      <Notification message={confirmationMessage} />
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
