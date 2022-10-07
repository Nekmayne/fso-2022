import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) =>
      setCountries(
        response.data.map(({ name, capital, area, languages, flags }) => ({
          name: name.common,
          capital,
          area,
          languages,
          flags,
        }))
      )
    );
  }, []);

  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState({});

  const handleInput = (e) => {
    setInput(e.target.value);
    setShow({});
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(input.toLowerCase())
  );

  const showCountries = (name) => {
    setShow(
      filteredCountries.filter((country) => country.name.includes(name))[0]
    );
  };

  console.log(showCountries);

  return (
    <div>
      <p>
        find countries <input value={input} onChange={handleInput} />
      </p>

      {filteredCountries.length > 10 && (
        <div> "too many matches specify another filter"</div>
      )}
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <div key={country.name}>
            {country.name}
            <button onClick={() => showCountries(country.name)}>show</button>
          </div>
        ))}

      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
      {show.name && <CountryDetails country={show} />}
    </div>
  );
};

export default App;
