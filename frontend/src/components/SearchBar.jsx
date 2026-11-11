
import React from "react";
import { Search, X } from "lucide-react";

import "./SearchBar.css";

function SearchBar({
    value,
    onChange,
    placeholder = "Search events, locations...",
    onSearch
}) {
    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSearch) {
            onSearch(value);
        }
    };

    const clearSearch = () => {
        if (onChange) {
            onChange("");
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>

            <Search className="search-icon" size={21} />

            <input
                type="text"
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                aria-label="Search events"
            />

            {value && (
                <button
                    type="button"
                    className="clear-search-btn"
                    onClick={clearSearch}
                    aria-label="Clear search"
                >
                    <X size={18} />
                </button>
            )}

            <button type="submit" className="search-submit-btn">
                Search
            </button>

        </form>
    );
}

export default SearchBar;
