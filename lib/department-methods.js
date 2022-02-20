const inquirer = require('inquirer');
const mysql = require('mysql2');

const { promptUser } = require('../server');

const connection = require('./db/connection');

// const connection = mysql.createConnection({
//     host: 'localhost',
//       // MySQL username,
//     user: 'root',
//       // MySQL password,
//     password: 'nahcYj-6fegwo-pifbyt',
//       // MySQL database name
//     database: 'staffing'
//     },
//     console.log('Connected to the staffing database.')
// );



// View department
const viewAllDep = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    )
}

const addDep = () => {
    inquirer
        .prompt({
            type: 'text',
            name: 'dep_name',
            message: 'Please enter the name of new department to be added: '
        })
        .then((data) => {
            connection.query(
                `INSERT INTO department (name)
                VALUES(?)`,
                [data.dep_name],
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.log('New department added!');
                    promptUser();
                }
            )
        })
}

module.exports = { viewAllDep, addDep };