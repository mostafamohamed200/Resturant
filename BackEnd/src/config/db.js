import mysql from "mysql2";

export const db = mysql.createConnection({
  database:'resturant_db',
  port:'3306',
  user:'root',
  password:''
})