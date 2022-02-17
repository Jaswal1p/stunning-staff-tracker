const inquirer = require('inquirer');
const mysql = require('mysql2');

const { promptUser } = require('../server');

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

const viewAllEmp = () => {

    // connect to the database staffing
    connection.query(
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


module.exports = { viewAllEmp };