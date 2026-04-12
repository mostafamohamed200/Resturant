import {db} from "../config/db.js";

export default class UserRepository{
  static findByEmail(email){
    return new Promise((resolve, reject)=>{
      db.query("select * from users where email = ?",[email],(err,data)=>{
        if (err) reject(err);
        resolve(data[0]);
      });
    });
  }
  static create(user){
    return new Promise((resolve, reject)=>{
      const query = "insert into users (name, email, password, role) values(?,?,?,?)";
      db.query(query,[user.name, user.email, user.password, user.role],(err,result)=>{
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}