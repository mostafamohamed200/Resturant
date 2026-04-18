    


import db from "../config/db.js";

export default class TableService {

  // ✅ GET ALL
  static getTables() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tables", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // ✅ CREATE
  static createTable(data) {
    const { table_number, capacity } = data;

    return new Promise((resolve, reject) => {

      // check duplicate
      db.query(
        "SELECT * FROM tables WHERE table_number = ?",
        [table_number],
        (err, result) => {
          if (result.length > 0) {
            return reject(new Error("Table already exists"));
          }

          db.query(
            "INSERT INTO tables (table_number, capacity) VALUES (?, ?)",
            [table_number, capacity],
            (err) => {
              if (err) return reject(err);
              resolve({ message: "Table created 🔥" });
            }
          );
        }
      );
    });
  }

  // ✅ UPDATE (FULL + PARTIAL)
  static updateTable(id, data) {
    const { table_number, capacity, status } = data;

    return new Promise((resolve, reject) => {

      db.query("SELECT * FROM tables WHERE id = ?", [id], (err, result) => {
        if (result.length === 0) {
          return reject(new Error("Table not found"));
        }

        const table = result[0];

        const newTableNumber = table_number || table.table_number;
        const newCapacity = capacity || table.capacity;
        const newStatus = status || table.status;

        const validStatus = ["available", "occupied", "reserved"];
        if (!validStatus.includes(newStatus)) {
          return reject(new Error("Invalid status"));
        }

        // check duplicate number
        db.query(
          "SELECT * FROM tables WHERE table_number = ? AND id != ?",
          [newTableNumber, id],
          (err, exist) => {
            if (exist.length > 0) {
              return reject(new Error("Table number exists"));
            }

            db.query(
              `UPDATE tables SET table_number=?, capacity=?, status=? WHERE id=?`,
              [newTableNumber, newCapacity, newStatus, id],
              (err) => {
                if (err) return reject(err);
                resolve({ message: "Table updated 🔥" });
              }
            );
          }
        );
      });
    });
  }

  // ✅ UPDATE STATUS
  static updateStatus(id, status) {

    return new Promise((resolve, reject) => {

      const validStatus = ["available", "occupied", "reserved"];
      if (!validStatus.includes(status)) {
        return reject(new Error("Invalid status"));
      }

      db.query(
        "UPDATE tables SET status = ? WHERE id = ?",
        [status, id],
        (err) => {
          if (err) return reject(err);
          resolve({ message: "Status updated 🔥" });
        }
      );
    });
  }
}