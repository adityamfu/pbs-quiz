// request libary mysql
const mysql = require("mysql");

// variable koneksi untuk database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mahasiswa",
});

// mengeluarkan variable agar bisa digunakan diluar file
module.exports = db;
