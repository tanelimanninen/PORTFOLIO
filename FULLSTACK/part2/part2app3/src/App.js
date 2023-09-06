import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './components/Input'
import Information from './components/Information'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect run, name state is now', value)

    //IF NAME IS DEFINED
    if (value) {
      console.log('fetching country data...')
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
          //LIMIT RESULTS TO FIRST 10 MATCHES
          console.log(response.data.length)
          const first10Countries = response.data.slice(0, 10)
          setCountries(first10Countries) 
        })
        .catch(error => {
          console.error('Error fetching country data:', error);
          setCountries([]); // Handle errors by setting countries to an empty array
        });
    } 
    //IF INPUT IS EMPTY, CLEAR COUNTRIES LIST
    else {
      setCountries([]);
    }
  }, [value])

  //EVENT HANDLER FOR INPUT FIELD AND UPDATE NEW NAME VALUE
  const handleChange = (event) => {
    event.preventDefault()
    //console.log(event.target.value)
    setValue(event.target.value)
  }

  return (
    <div className="App">
      <h1>Countries App</h1>
      <Input value={value} handleChange={handleChange} />
      <br/>
      <Information countries={countries} />
    </div>
  );
}

export default App;
