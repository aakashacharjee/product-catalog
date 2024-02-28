import React from 'react';
import '../styling/CategoryPage.css'; // Import the CSS

const ClearFiltersButton = ({ onClear }) => {
  return (
    <button className='clear-button' onClick={onClear}> 
      <svg class="clear-icon" viewBox="0 0 24 24" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path fill="rgb(19, 19, 19)" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
      Clear Filters
    </button>
  );
};

export default ClearFiltersButton;
