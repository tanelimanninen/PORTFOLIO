const Information = ({ countries }) => {
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
    else if (countries.length === 1) {
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
          </div>
        );
    } 
    //CONDITION 3: RETURN THIS MESSAGE
    else {
        return <p>No matching countries found.</p>;
    }
}

export default Information