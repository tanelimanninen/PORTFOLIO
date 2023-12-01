import '../App.css'
import { useState } from 'react';
import axios from 'axios';

import { Weather, Visibility, ValidationError } from '../types';
import { createDiary } from '../services/diaries';

const Form = ({ setDiaries }) => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState(Weather.Default); //SET DEFAULT STATE FROM ENUM
    const [visibility, setVisibility] = useState(Visibility.Default); //SET DEFAULT STATE FROM ENUM
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addDiary = (event: React.FormEvent) => {
        event.preventDefault();
    
        createDiary({ date, weather, visibility, comment })
          .then(createdDiary => {
            setDiaries(previousDiaries => [...previousDiaries, createdDiary]);
    
            setDate('');
            setWeather(Weather.Default);
            setVisibility(Visibility.Default);
            setComment('');
          })
          .catch(error => {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
              console.error(error.response?.data);
    
              setErrorMessage(`${error.response?.data}`);
    
              setTimeout(() => {
                setErrorMessage('');
              }, 3000);
            } else {
              console.error(error);
    
              setErrorMessage('Something went wrong');
    
              setTimeout(() => {
                setErrorMessage('');
              }, 3000);
            }
    
        });
    };

    return (
        <div>
            {errorMessage}

            <h3>Add new entry</h3>

            <form onSubmit={addDiary}>
                <div>
                <label htmlFor="date">Date:</label>
                <input 
                    placeholder='Date'
                    type='date'
                    name='date'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                </div>

                <div id='radio-group'>
                <label>Weather:</label>
                {Object.values(Weather).map(weatherOption => (
                    <div key={weatherOption}>
                    <input
                        type="radio"
                        id={`weather-${weatherOption}`}
                        name="weather"
                        value={weatherOption}
                        checked={weather === weatherOption}
                        onChange={() => setWeather(weatherOption as Weather)}
                    />
                    <label htmlFor={`weather-${weatherOption}`}>{weatherOption}</label>
                    </div>
                ))}
                </div>

                <div id='radio-group'>
                <label>Visibility:</label>
                {Object.values(Visibility).map(visibilityOption => (
                    <div key={visibilityOption}>
                    <input
                        type="radio"
                        id={`visibility-${visibilityOption}`}
                        name="visibility"
                        value={visibilityOption}
                        checked={visibility === visibilityOption}
                        onChange={() => setVisibility(visibilityOption as Visibility)}
                    />
                    <label htmlFor={`visibility-${visibilityOption}`}>{visibilityOption}</label>
                    </div>
                ))}
                </div>
                <div>
                <input
                    placeholder='Comments'
                    type='text'
                    name='comment'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                </div>
                <button type='submit' id='add-button'>Add</button>
            </form>
        </div>
    )
};

export default Form;