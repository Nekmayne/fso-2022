const Form = ({
  handleNewPerson,
  newName,
  newNumber,
  handleName,
  handleNumber,
}) => {
  return (
    <form onSubmit={handleNewPerson}>
      <h1>Add a new</h1>
      <div>
        name: <input value={newName} onChange={handleName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
