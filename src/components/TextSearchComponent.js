import React from 'react'
import "../css/NavBar.css";
import "../test.js";

function TextSearchComponent() {
  return (
    <div class="search-container">
        <input type="text" id="search-input" placeholder="Search..."/>
    <span class="search-icon">&#x1F50D;</span>
  </div>
  )
}

export default TextSearchComponent