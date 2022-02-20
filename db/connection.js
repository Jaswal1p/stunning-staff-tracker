const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password,
    password: 'nahcYj-6fegwo-pifbyt',
    // MySQL database name
    database: 'staffing'
  },
    console.log('Connected to the staffing database.')
  );



  module.exports = connection;