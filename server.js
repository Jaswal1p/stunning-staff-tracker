const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const promptUser = () => {
    inquirer 

    // This is a section of initial prompts as required by assignment
    .prompt({
        type: 'list',
        name: 'all choices',
        message: 'Application can help you with following choice: Please pick one',
        choices: [
            'View all department',
            'View all role',
            'View all employee',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update role of an employee',
            'View all employee by department',
            'View all employee by manager',
            'View total budget',
            'Finished'
        ]
    })

    // use the above choices and create switch statements to decide what to do based upon choice clicked
    .then((data) => {
        switch (data['all choices']) {
            case 'View all department':
                viewAllDep();
                break;
            case 'View all role':
                viewAllRole();
                break;    
            case 'View all employee':
                viewAllEmp();
                break;
            case 'Add a department':
                addDep();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmp();
                break;    
            case 'Update role of an employee':
                upEmp();
                break;
            case 'View all employee by department':
                viewEmpByDep();
                break;
            case 'View all employee by manager':
                viewEmpByMang();
                break;
            case 'View total budget of a department':
                totalBudgetByDept();
                break;
            case 'Finished':
                break;     
                        
        }
    })
}



// Connect to database
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // Your MySQL username,
//       user: 'root',
//       // Your MySQL password
//       password: 'nahcYj-6fegwo-pifbyt',
//       database: 'staffing'
//     },
//     console.log('Connected to the staffing database.')
//   );


// View department
// const viewAllDep = () => {
//     connection.query(
//         `SELECT * FROM department`,
//         function (err, results, fields) {
//             if (err) {
//                 console.log(err.message);
//                 return;
//             }
//             console.table(results);
//             promptUser();
//         }
//     )
// }

// const addDep = () => {
//     inquirer
//         .prompt({
//             type: 'text',
//             name: 'dep_name',
//             message: 'Please enter the name of new department to be added: '
//         })
//         .then((data) => {
//             connection.query(
//                 `INSERT INTO department (name)
//                 VALUES(?)`,
//                 [data.dep_name],
//                 function (err, results, fields) {
//                     if (err) {
//                         console.log(err.message);
//                         return;
//                     }
//                     console.log('New department added!');
//                     promptUser();
//                 }
//             )
//         })
// }


//   View all employee
// app.get('/api/employee', (req, res) => {
//     const sql = `SELECT * FROM employee`; 
  
      
//     db.query(sql, (err, row) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
//   });



const viewAllEmp = () => {

    // connect to the database staffing
    Connection.query(
        //work through all tables to view all employees
        `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary AS salary, manager.first_name AS manager, department.name AS department
        FROM employee
        LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department
        ON role.department_id = department.id
        LEFT JOIN manager
        ON employee.manager_id = manager.id`,

        // Call back function here
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

        // show result table 
        console.table(results);
        
        // Re-prompt user for other choices
        promptUser();
        }
    );
};



// Get a single employee
// app.get('/api/employee/:id', (req, res) => {
//     const sql = `SELECT * FROM employee WHERE id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
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

// Section for exporting this module comprised of many individual methods
module.exports = { promptUser }

