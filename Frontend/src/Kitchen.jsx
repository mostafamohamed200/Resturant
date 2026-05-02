import React, { useState } from "react";
import "./Kitchen.css";

const initialOrders = [
  {
    id: 1,
    table: "08",
    time: "14:32",
    covers: 4,
    type: "URGENT ORDER",
    status: "new",
    items: [
      { name: "2x Wagyu Beef Tartare", category: "Appetizer" },
      { name: "1x Pan-Seared Sea Bass", category: "Main" },
      { name: "1x Wild Mushroom Risotto", category: "Main" },
    ]
  },
  {
    id: 2,
    table: "12",
    time: "08:15",
    covers: 2,
    type: "IN PREPARATION",
    status: "preparing",
    items: [
      { name: "1x Duck Confit", category: "Main" },
      { name: "1x Ribeye Steak", category: "Main" },
    ]
  },
  {
    id: 3,
    table: "05",
    time: "10:20",
    covers: 3,
    type: "NEW ORDER",
    status: "new",
    items: [
      { name: "3x Greek Salad", category: "Appetizer" },
      { name: "1x Grilled Salmon", category: "Main" }
    ]
  },
  {
    id: 4,
    table: "03",
    time: "11:05",
    covers: 1,
    type: "IN PREPARATION",
    status: "preparing",
    items: [
      { name: "1x Chocolate Lava Cake", category: "Dessert" },
      { name: "1x Espresso", category: "Beverage" }
    ]
  },
  {
    id: 5,
    table: "15",
    time: "12:40",
    covers: 5,
    type: "URGENT ORDER",
    status: "new",
    items: [
      { name: "5x Beef Burger", category: "Main" },
      { name: "2x Large Fries", category: "Side" }
    ]
  }
];

export default function Kitchen() {
  const [orders, setOrders] = useState(initialOrders);

  // تحديث الحسبة: كل أوردر بيمثل 20% من ضغط المطبخ
  // 5 أوردرات = 100% تحميل
  const currentLoad = Math.min(orders.length * 20, 100);

  const startOrder = (id) => {
    setOrders(orders.map(o => 
      o.id === id ? { ...o, status: "preparing", type: "IN PREPARATION" } : o
    ));
  };

  const finishOrder = (id) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div className="kitchen-board-container">
      <header className="kitchen-header">
        <div className="header-left">
          <h1>Kitchen Board</h1>
          <div className="load-info">
            <span>CURRENT LOAD</span>
            <div className="progress-bar-bg">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${currentLoad}%`, 
                  transition: 'width 0.5s ease',
                  backgroundColor: currentLoad > 80 ? '#ef4444' : '#2563eb' // بيتغير للأحمر لو الضغط زاد عن 80%
                }}
              ></div>
            </div>
            <span className="percent">{currentLoad}%</span>
          </div>
        </div>
      </header>

      <div className="orders-grid">
        {orders.map(order => (
          <div key={order.id} className={`order-card ${order.status}`}>
            <div className="card-top">
              <span className={`status-tag ${order.type.includes('URGENT') ? 'urgent' : 'prep'}`}>
                {order.type}
              </span>
              <span className="order-time">🕒 {order.time}</span>
            </div>
            
            <div className="table-header">
              <h2>Table {order.table}</h2>
              <span className="covers-count">{order.covers} Covers</span>
            </div>

            <div className="items-container">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <div className="item-main">
                    <span className="item-name">{item.name}</span>
                    <span className="item-category-tag">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-footer-actions">
              {order.status === "new" ? (
                <>
                  <button className="btn-action-start" onClick={() => startOrder(order.id)}>▶ Start</button>
                  <button className="btn-action-ready-disabled" disabled>Ready</button>
                </>
              ) : (
                <>
                  <button className="status-label-preparing">♨ Preparing...</button>
                  <button className="btn-action-mark-ready" onClick={() => finishOrder(order.id)}>Mark as Ready</button>
                </>
              )}
            </div>
          </div>
        ))}
        
        {orders.length === 0 && (
          <div className="all-clear-message">
            <h2>🎉 Kitchen is Empty!</h2>
            <p>All orders have been served.</p>
          </div>
        )}
      </div>
    </div>
  );
}