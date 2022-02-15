const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'nahcYj-6fegwo-pifbyt',
      database: 'staffing'
    },
    console.log('Connected to the staffing database.')
  );


//   db.query(`SELECT * FROM employee`, (err, rows) => {
//     console.log(rows);
//   });



// GET a single employee

// db.query(`SELECT * FROM employee WHERE id = 1`, (err, row) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(row);
//   });


  
// Delete an employee

// db.query(`DELETE FROM employee WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });


// Create an employee

// const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
//               VALUES (?,?,?,?,?)`;
// const params = [1, 'Jim', 'Daly', 1, null];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });


// db.query(`SELECT * FROM role`, (err, rows) => {
//     console.log(rows);
//   });

// db.query(`SELECT * FROM department`, (err, rows) => {
//     console.log(rows);
//   });


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });