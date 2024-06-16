import sqlite3 from "sqlite3";
sqlite3.verbose();

export const db = new sqlite3.Database("./database/database.db", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to the database.");
});

export async function initDB(){
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)"
  );
};

export default db;