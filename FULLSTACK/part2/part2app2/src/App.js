import './App.css';
import Person from './components/Person';
import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  //const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} person={person} />
          )}
      </div>
    </div>
  );
}

export default App;
