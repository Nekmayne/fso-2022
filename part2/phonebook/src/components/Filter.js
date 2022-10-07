const Filter = ({ query, handleFilter }) => {
  return (
    <p>
      filter shown with: <input value={query} onChange={handleFilter} />
    </p>
  );
};

export default Filter;
