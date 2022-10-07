import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleNewPerson = (e) => {
    e.preventDefault();

    const personFound = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (personFound) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personFound.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personFound.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setStatus("error");
            setSuccessMessage(
              `Information of ${personFound.name} has already been removed from server`
            );
            setTimeout(() => {
              setStatus(null);
              setSuccessMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(newPerson).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setStatus("success");
        setSuccessMessage(`Added ${addedPerson.name}`);
        setTimeout(() => {
          setStatus(null);
          setSuccessMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDestroy = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.destroy(id).then((deletedPerson) => {
        setPersons(
          persons.filter((person) => person.name !== deletedPerson.name)
        );
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} status={status} />
      <Filter query={filter} handleFilter={handleFilter} />
      <Form
        name={newName}
        number={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        handleNewPerson={handleNewPerson}
      />
      <Persons
        persons={persons}
        filter={filter}
        handleDestroy={handleDestroy}
      />
    </div>
  );
};

export default App;
