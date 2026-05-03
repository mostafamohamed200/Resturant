import React, { useState } from "react";


import Tables from "./Tables"; 
import Kitchen from "./Kitchen";
import Meals from "./Meals"; 
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("tables"); 
  const [userRole, setUserRole] = useState("");

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    // توجيه تلقائي حسب الوظيفة
    if (role === "CHEF") setCurrentPage("kitchen");
    else setCurrentPage("tables");
  };

 

  return (
    <div className="app-shell">
      {/* القائمة الجانبية */}
      <aside className="app-sidebar">
        <div className="brand-section">
          <h2>Luminous</h2>
          <p>Restaurant Suite</p>
        </div>

        <nav className="side-nav">
          {/* زر التربيزات */}
          <button 
            className={`nav-item ${currentPage === "tables" ? "active" : ""}`} 
            onClick={() => setCurrentPage("tables")}
          >
            <span className="icon">🪑</span> Tables Overview
          </button>

          {/* زر الوجبات */}
          <button 
            className={`nav-item ${currentPage === "meals" ? "active" : ""}`} 
            onClick={() => setCurrentPage("meals")}
          >
            <span className="icon">🍴</span> Menu & Meals
          </button>

          {/* زر المطبخ */}
          <button 
            className={`nav-item ${currentPage === "kitchen" ? "active" : ""}`} 
            onClick={() => setCurrentPage("kitchen")}
          >
            <span className="icon">👨‍🍳</span> Kitchen Board
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* منطقة عرض المحتوى */}
      <main className="main-content">
        <div className="view-container">
          {currentPage === "tables" && <Tables />}
          {currentPage === "meals" && <Meals />}
          {currentPage === "kitchen" && <Kitchen />}
        </div>
      </main>
    </div>
  );
}

export default App;