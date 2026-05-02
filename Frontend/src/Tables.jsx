import React, { useState } from "react";
import "./Tables.css";

const initialTables = [
  { id: "T1", name: "Table One", guests: "4/4", time: "45m", status: "OCCUPIED" },
  { id: "T2", name: "Window Nook", guests: "0/2", time: "Clean", status: "AVAILABLE" },
  { id: "T3", name: "The Round", guests: "6/8", time: "12m", status: "OCCUPIED" },
  { id: "T4", name: "Terrace A", guests: "0/4", time: "Res 8PM", status: "AVAILABLE" },
  { id: "T5", name: "Corner Suite", guests: "2/2", time: "95m+", status: "OCCUPIED", alert: true },
  { id: "T6", name: "Booth C1", guests: "0/6", time: "Clean", status: "AVAILABLE" },
  { id: "T7", name: "Booth C2", guests: "0/6", time: "Clean", status: "AVAILABLE" },
];

export default function Tables() {
  const [tables, setTables] = useState(initialTables);
  const MAX_TABLES = 12; // الحد الأقصى لعدد التربيزات

  // دالة تبديل حالة التربيزة (تفاعلية)
  const toggleTableStatus = (id) => {
    setTables(tables.map(table => {
      if (table.id === id) {
        const isAvailable = table.status === "AVAILABLE";
        return {
          ...table,
          status: isAvailable ? "OCCUPIED" : "AVAILABLE",
          time: isAvailable ? "0m" : "Clean",
          alert: false
        };
      }
      return table;
    }));
  };

  // دالة إضافة تربيزة جديدة بحد أقصى
  const addNewTable = () => {
    if (tables.length >= MAX_TABLES) {
      alert(`عفواً، لا يمكن إضافة أكثر من ${MAX_TABLES} تربيزات في هذه الصالة.`);
      return;
    }

    const newIdNum = tables.length + 1;
    const newTable = {
      id: `T${newIdNum}`,
      name: `New Table ${newIdNum}`,
      guests: "0/4",
      time: "Clean",
      status: "AVAILABLE",
      alert: false
    };
    setTables([...tables, newTable]);
  };

  const occupiedCount = tables.filter(t => t.status === "OCCUPIED").length;

  return (
    <div className="tables-page-container">
      <div className="tables-grid-section">
        <div className="tables-grid">
          {tables.map((table) => (
            <div 
              key={table.id} 
              className={`table-card ${table.alert ? "border-alert" : ""} ${table.status.toLowerCase()}`}
              onClick={() => toggleTableStatus(table.id)}
            >
              <div className="card-header">
                <span className="table-id-tag">{table.id}</span>
                <span className={`status-pill ${table.status.toLowerCase()}`}>
                  {table.status}
                </span>
              </div>
              <h3 className="table-name">{table.name}</h3>
              <div className="table-details">
                <span className="guests-info">👥 {table.guests}</span>
                <span className={`time-info ${table.alert ? "time-alert" : ""}`}>
                  {table.status === "OCCUPIED" ? "🕒 " : "✨ "}{table.time}
                </span>
              </div>
            </div>
          ))}
          
          {/* زر الإضافة يختفي عند الوصول للحد الأقصى */}
          {tables.length < MAX_TABLES && (
            <div className="table-card add-table-card" onClick={addNewTable}>
              <div className="add-icon">+</div>
              <p>ADD TABLE</p>
            </div>
          )}
        </div>
      </div>

      {/* الجانب الأيمن (Sidebar) */}
      <aside className="tables-sidebar">
        <div className="sidebar-widget capacity-card">
          <h4>FLOOR CAPACITY</h4>
          <div className="stat-row">
            <span>Occupied Tables</span>
            <span>{occupiedCount} / {tables.length}</span>
          </div>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${(occupiedCount / tables.length) * 100}%` }}></div>
          </div>
          <p className="limit-text">Max Limit: {MAX_TABLES} Tables</p>
        </div>

        <div className="sidebar-widget alerts-card">
          <h4>RECENT ALERTS</h4>
          {tables.some(t => t.alert) ? (
             tables.filter(t => t.alert).map(t => (
                <div key={t.id} className="alert-item">
                  <span className="dot red"></span>
                  <p>{t.id} overstayed (+20m) <br/><span>Just now</span></p>
                </div>
             ))
          ) : (
            <div className="alert-item">
              <span className="dot blue"></span>
              <p>No urgent alerts <br/><span>All clear</span></p>
            </div>
          )}
        </div>

        {/* الكارت اللي تحت وفيه الصورة */}
        <div className="pro-tip-card">
          <div className="pro-tag">PRO TIP</div>
          <p>Optimize table turnover with auto-reminders.</p>
        </div>
      </aside>
    </div>
  );
}