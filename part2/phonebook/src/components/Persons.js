import Person from "./Person";

const Persons = ({ persons, filter, handleDestroy }) => {
  return (
    <div>
      <h1>Names and Numbers</h1>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(({ name, number, id }) => (
          <Person
            key={id}
            name={name}
            number={number}
            handleDestroy={handleDestroy(id, name)}
          />
        ))}
    </div>
  );
};

export default Persons;
