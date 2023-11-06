import React, { useState, useEffect } from 'react'
import axios from 'axios'

//CUSTOM HOOK 1
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

//CUSTOM HOOK 2
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    //CONDITION 1: IF NAME IS EMPTY, DO NOTHING
    if (name === '') {
      return
    }
    //CONDITION 2: GET COUNTRY DATA
    console.log('fetching country data...')
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
          const data = response.data
          console.log(data)
          setCountry({ found: true, data: data[0] })
          console.log(country)
        })
        .catch((error) => {
          console.error('Error fetching country data:', error);
          setCountry({ found: false, data: null });
        })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.common} </h3>
      <img src={flags.svg} height='100' alt={`flag of ${country.data.name.common}`}/>
      <div><b>Capital:</b> {capital} </div>
      <div><b>Population:</b> {population}</div>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App