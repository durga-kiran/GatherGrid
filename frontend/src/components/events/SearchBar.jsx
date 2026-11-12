const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search events, locations...",
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search events"
      />

      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;