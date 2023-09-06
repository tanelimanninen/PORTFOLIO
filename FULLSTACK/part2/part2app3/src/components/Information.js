import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Information = ({ countries }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        // FUNCTION TO FETCH WEATHER DATA
        const fetchWeatherData = async (capital) => {
        try {
          const apiKey = 'a9ad552ae8927528f493caaecce95c16'
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
          )
          setWeather(response.data)
          console.log(response.data)
        } 
        //SET WEATHERDATA TO NULL IF ERROR
        catch (error) {
          console.error('Error fetching weather data:', error)
          setWeather(null)
        }
      }

      //WHEN LENGTH IS 1 COUNTRY FETCH THE DATA
      if (countries.length === 1) {
        const country = countries[0];
        if (country.capital) {
          fetchWeatherData(country.capital);
        }
      } 
      //SET DATA TO NULL WHEN THERE'S MULTIPLE COUNTRIES
      else {
        setWeather(null);
      }

    }, [countries]
    )

    // Construct the weather icon URL based on the icon code
    const getWeatherIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}.png`
    }

    //CONDITION 1: AMOUNT OF RETURNED COUNTRIES IS MORE THAN 1
    if (countries.length > 1) {
        return (
          <div>
            <ul className='dotless'>
              {countries.map((country, index) => (
                <li key={index}>{country.name.common}</li>
              ))}
            </ul>
          </div>
        );
    } 
    //CONDITION 2: AMOUNT OF RETURNED COUNTRIES IS 1
    else if (countries.length === 1 && weather) {
        const country = countries[0];
        
        return (
          <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h4>Official languages</h4>
            <ul className='dots'>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <div className='flag'>
              <img src={country.flags.svg} alt='Flag of the country' width='100%' />
            </div>
            <h4>Weather today in {country.capital}</h4>
            <img
                className='weather-icon'
                src={getWeatherIconUrl(weather.weather[0].icon)}
                alt={`Weather icon for ${weather.weather[0].description}`}
             />
            <p>Temperature: {weather.main.temp}°C</p>
          </div>
        );
    } 
    //CONDITION 3: RETURN THIS MESSAGE
    else {
        return <p>No matching countries found.</p>;
    }
}

export default Information