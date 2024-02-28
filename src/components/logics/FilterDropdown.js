import React from 'react';
import '../styling/CategoryPage.css'; // Import the CSS

function FilterDropdown({ title, options, selected, onChange }) {
  return (
    <div className='filter-dropdown'> 
      <label htmlFor="filter">{title}: </label>
      <select id="filter" value={selected} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;
