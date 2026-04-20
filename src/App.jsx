import React, { useState } from 'react';
import './App.css';
import Meals from './components/Meals'; // استدعاء ملف الوجبات
import Tables from './components/Tables'; // استدعاء ملف الطاولات

function App() {
  const [page, setPage] = useState('meals');

  return (

    
    <div>
     <nav className="navbar">
  <h2>Food</h2>
  <div className="nav-links">
    <button onClick={() => setPage('meals')}>Meals</button>
    <button onClick={() => setPage('tables')}>Tables</button>
  </div>
</nav>

      <div className="container">
        {/* هنا بنقول لـ React لو الصفحة meals اعرض ملف الوجبات، لو tables اعرض ملف الطاولات */}
        {page === 'meals' ? <Meals /> : <Tables />}
      </div>
    </div>
  );
}

export default App;