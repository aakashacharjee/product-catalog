import React from 'react';
import '../styling/CategoryPage.css'; // Import the CSS

function SortDropdown({ title, options, selected, onChange }) {
  return (
    <div className='sort-dropdown'>  
      <label htmlFor="sort">{title}: </label>
      <select id="sort" value={selected} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortDropdown;
