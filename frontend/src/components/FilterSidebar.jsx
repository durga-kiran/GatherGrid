
import React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

import "./FilterSidebar.css";

function FilterSidebar({
    category,
    setCategory,
    location,
    setLocation,
    maxPrice,
    setMaxPrice,
    onReset
}) {
    const handleReset = () => {
        setCategory("");
        setLocation("");
        setMaxPrice(5000);

        if (onReset) {
            onReset();
        }
    };

    return (
        <aside className="filter-sidebar">

            <div className="filter-header">
                <h3>
                    <SlidersHorizontal size={20} />
                    Filters
                </h3>

                <button
                    type="button"
                    className="filter-reset-btn"
                    onClick={handleReset}
                >
                    <RotateCcw size={14} />
                    Reset
                </button>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
                <h4>Event Category</h4>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Music">Music</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Technology">Technology</option>
                    <option value="Sports">Sports</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Food">Food</option>
                    <option value="Workshop">Workshop</option>
                </select>
            </div>

            {/* Location Filter */}
            <div className="filter-group">
                <h4>Location</h4>

                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city name"
                />
            </div>

            {/* Price Filter */}
            <div className="filter-group">
                <h4>Maximum Ticket Price</h4>

                <div className="price-display">
                    ₹{Number(maxPrice).toLocaleString("en-IN")}
                </div>

                <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                />

                <div className="price-range-labels">
                    <span>₹0</span>
                    <span>₹5,000</span>
                </div>
            </div>

        </aside>
    );
}

export default FilterSidebar;
