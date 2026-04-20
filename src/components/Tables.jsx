import React from 'react';
import'./Tables.css';
function Tables() {
  return (
    <div className="tables-container">
      <div className="reserve-card">
        <h1>Reserve a Table</h1>
        <p>Select your details and we'll try to get the best seats for you.</p>
        
        <div className="input-group">
          <label>Party Size</label>
          <select>
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4 guests</option>
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>
          <input type="date" />
        </div>

        <div className="input-group">
          <label>Time</label>
          <input type="time" />
        </div>

        <button className="book-btn">Book Table</button>
      </div>
    </div>
  );
}

export default Tables;