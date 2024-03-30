const express = require("express");
const app = express();
const port = 3002;

// memanggil request body-parser
const bodyParser = require("body-parser");

// memanggil file request.js
const response = require("./request.js");

// memanggil file config.js
const db = require("./config.js");
const { error } = require("console");

//menggunakan body-parser
app.use(bodyParser.json());

// route get data
app.get("/", (req, res) => {
  const sql = `SELECT * FROM bio`;
  db.query(sql, (error, result) => {
    response(200, result, "data mahasiswa", res);
    console.log(result);
  });
});

// route get detail
app.get("/mahasiswa/:npm", (req, res) => {
  const npm = req.params.npm;
  const sql = `SELECT * FROM bio where npm = '${npm}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      return response(500, {}, "Error querying database", res);
    }

    if (result.length === 0) {
      return response(404, {}, "Data mahasiswa tidak ditemukan", res);
    }

    response(200, result, "Data mahasiswa", res);
    console.log(result);
  });
});

// app.get("/mahasiswa/:npm", (req, res) => {
//     const npm = req.params.npm;
//     const sql = `SELECT * FROM bio where npm = '${npm}'`;
//     db.query(sql, (err, result) => {
//       if (err) throw err;
//       response(200, result, "data mahasiswa", res);
//       console.log(result);
//     });
//   });

// route post data
app.post("/mahasiswa", (req, res) => {
  const { nama, npm, kelas, alamat } = req.body;
  const sql = `INSERT INTO bio (nama, npm, kelas, alamat) values ('${nama}','${npm}','${kelas}','${alamat}');`;

  db.query(sql, (error, fields) => {
    if (error)
      response(
        500,
        "invalid",
        `${id} dengan nama ${nama} sudah ditambahkan `,
        res
      );
    if (fields?.affectedRows) {
      const data = {
        isSucces: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Data berhasil di simpan", res);
    }
  });
});

// route put data
app.put("/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  const { nama, kelas, npm, alamat } = req.body;
  let updateValues = [];

  // Membuat array nilai yang akan diperbarui
  if (nama) updateValues.push(`nama='${nama}'`);
  if (kelas) updateValues.push(`npm='${npm}'`);
  if (npm) updateValues.push(`kelas='${kelas}'`);
  if (alamat) updateValues.push(`alamat='${alamat}'`);

  // Memeriksa apakah ada nilai yang akan diperbarui
  if (updateValues.length === 0) {
    return response(400, {}, "Tidak ada data yang diperbarui", res);
  }

  // Membangun kueri SQL untuk memperbarui entri berdasarkan ID
  const sql = `UPDATE bio SET ${updateValues.join(",")} WHERE id='${id}';`;

  db.query(sql, (error, fields) => {
    if (error)
      response(
        500,
        "invalid",
        `Gagal memperbarui data mahasiswa dengan ID ${id}`,
        res
      );
    if (fields?.affectedRows > 0) {
      response(200, { id, ...req.body }, "Data berhasil diperbarui", res);
    } else {
      response(404, {}, `Data mahasiswa dengan ID ${id} tidak ditemukan`, res);
    }
  });
});

// route delete data
app.delete("/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM bio WHERE id='${id}';`;

  db.query(sql, (error, fields) => {
    if (error)
      response(
        500,
        "invalid",
        `Gagal menghapus data mahasiswa dengan ID ${id}`,
        res
      );
    if (fields?.affectedRows > 0) {
      response(200, { id }, "Data berhasil dihapus", res);
    } else {
      response(404, {}, `Data mahasiswa dengan ID ${id} tidak ditemukan`, res);
    }
  });
});

app.listen(port, () => {
  console.log(`Run in port http://localhost:${port}`);
});
