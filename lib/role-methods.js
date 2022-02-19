const inquirer = require('inquirer');
const mysql = require('mysql2');

const { promptUser } = require('../server');

// connection to the database as on the employee-methods.js and department-methods.js files

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