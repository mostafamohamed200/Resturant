import React, { useState } from "react";
import "./Tables.css";

function Tables() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [show, setShow] = useState(false);

  const bookTable = () => {
    if (!date || !time) {
      alert("Please select date and time!");
      return;
    }

    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <div className="tables-page">
      <div className="table-form">
        <h1>Reserve a Table</h1>
        <p>Select your details</p>

        <label>Party Size</label>
        <select>
          <option>1 guest</option>
          <option>2 guests</option>
          <option>3 guests</option>
          <option>4 guests</option>
        </select>

        <label>Date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} />

        <label>Time</label>
        <input type="time" onChange={(e) => setTime(e.target.value)} />

        <button onClick={bookTable}>Book Table</button>

        {show && (
          <div className="success">
            ✅ Table Reserved Successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default Tables;