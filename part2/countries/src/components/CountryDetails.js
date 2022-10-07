const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png} alt="flag"></img>
      </div>
    </div>
  );
};

export default CountryDetails;
