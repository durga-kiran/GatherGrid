const FilterSidebar = ({
  categories = [],
  filters = {},
  onChange,
  onReset,
}) => {
  const updateFilter = (name, value) => {
    onChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>

        <button
          type="button"
          onClick={onReset}
          className="filter-reset"
        >
          Reset
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-category">Category</label>

        <select
          id="filter-category"
          value={filters.category || ""}
          onChange={(event) =>
            updateFilter("category", event.target.value)
          }
        >
          <option value="">All Categories</option>

          {categories.map((category) => {
            const name =
              typeof category === "string"
                ? category
                : category.name;

            return (
              <option key={name} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-location">Location</label>

        <input
          id="filter-location"
          type="text"
          placeholder="Enter city or location"
          value={filters.location || ""}
          onChange={(event) =>
            updateFilter("location", event.target.value)
          }
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filter-date">Event Date</label>

        <input
          id="filter-date"
          type="date"
          value={filters.date || ""}
          onChange={(event) =>
            updateFilter("date", event.target.value)
          }
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filter-sort">Sort By</label>

        <select
          id="filter-sort"
          value={filters.sortBy || "newest"}
          onChange={(event) =>
            updateFilter("sortBy", event.target.value)
          }
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;