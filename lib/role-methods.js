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

const viewAllRole = () => {
    connection.query(
        `SELECT role.id, role.title, role.salary, department.name
          FROM role
          LEFT JOIN department
          ON role.department_id = department.id`,

        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            console.table(results);
            promptUser();
        }
    );
};

const addRole = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err);
                return;
            }

            let deptArr = [];
            results.forEach(item => {
                deptArr.push(item.name)
            })

            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'role_title',
                        message: 'Please enter the name of the role you would like to add: '
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'Please enter the salary for this role: NOTE: Do not use commas and/or periods'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Please select the department where this role will be added',
                        choices: deptArr
                    }
                ])
                .then((data) => {
                    let department_id;

                    for (let i = 0; i < deptArr.length; i++) {
                        if (deptArr[i] === data.department) {
                            department_id = i + 1;
                        };
                    };

                    connection.query(
                        `INSERT INTO role (title, salary, department_id)
                                 VALUES(?, ?, ?)`,
                        [data.role_title, data.salary, department_id],
                        function (err, results, fields) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }

                            console.log('Role added!')
                            viewAllRole();
                            promptUser();
                        }
                    );
                });
        }
    );
};

module.exports = { viewAllRole, addRole };