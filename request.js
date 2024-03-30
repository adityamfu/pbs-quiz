// variable untuk di index
const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    payload: {
      status_code: statusCode,
      datas: data,
    },
    message: message,
    pagination: {
      prev: "",
      next: "",
      max: "",
    },
  });
};

// mengeluarkan variable agar bisa digunakan diluar file
module.exports = response;