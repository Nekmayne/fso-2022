const Person = ({ name, number, handleDestroy }) => {
  return (
    <p key={name}>
      {name} {number}{" "}
      <button onClick={handleDestroy} type="delete">
        delete
      </button>
    </p>
  );
};

export default Person;
