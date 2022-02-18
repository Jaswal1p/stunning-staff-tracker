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

// View Employee by Department 

const viewEmpByDept = () => {

  connection.query(
    `SELECT * FROM department`,

    function (err,results, fields) {
      if (err) {
        console.log(err.message);
        return;
      }
      // Here i create empty arry to store info
      deptArr = [];
      // Push the name of the department to this department array
      results.forEach(item => {
        deptArr.push(item.name)
      });
      inquirer
          .prompt({
            type: 'list',
            name: 'filter-emp-dep',
            message: 'Choose a department to filter from:',

            choices: deptArr
          })
          .then((data) => {
            // Take the data and filter based on what user chose
            connection.query(
              `SELECT employee.id, employee.first_name, employee_name, department.name AS department
              FROM employee
              LEFT JOIN roles
              ON employee.role_id = department.id
              WHERE department.name = ?`,
            // Value chosen bt the user will be replaced by a question mark, as aprotection for sql injection cyberattacks
            [data['filter-emp-dep']],
            function (err, results, fields) {
            if (err) {
              console.log(err.message);
              return;
            }  

            //show the results table.
            console.table(results);
            // Reprompt user
            promptUser();
          }
        )  
      });
    }
  );
};

// View employee by Manager

const viewEmpByMang = () => {

  connection.query(
    `SELECT * FROM manager`,

    function (err,results, fields) {
      if (err) {
        console.log(err.message);
        return;
      }
      // Here i create empty arry to store info
      mangArr = [];

      results.forEach(item => {
        manArr.push(item.first_name)
      })

      inquirer
          .prompt({
            type: 'list',
            name: 'filter-emp-mang',
            message: 'Choose a manager to filter from:',
            // Please note here choices are from manager array
            choices: mangArr
          })
          .then((data) => {
            connection.query(
              `SELECT employee.id, employee.first_name, manager.first_name AS manager
              FROM employee
              LEFT JOIN manager_id = manager.id
              WHERE manager.first_name = ?`,
              // Value user choses will be rplaced by question mark, for cybersecurity
              [data['filter-emp-man']],
              function (err, results, fields) {
                if (err) {
                  console.log(err.message);
                  return;
                }

                // Showing results here as table
                console.table(results);
                // Reprompt user here at the end
                promptUser();
              }
            );
          });
    }
  );
};      



// Delete an employee

const deleteEmp = () => {
console.log('running');
  connection.query('SELECT * FROM employee', (err, data) => {
    if (err) throw err;
    const allEmp = []
    for (let i = 0; i < data.length; i++) {
      allEmp.push(data[i].id)
    }
    inquirer.prompt([
      {
        type: 'list',
        name: 'name_select',
        message: 'Please select an employee you would like to delete',
        choices: allEmp
      }
    ]).then(answer => {
      connection.query('DELETE FROM employee WHERE ?', {id: answer.name_select})
    })
  })
}



// Delete a candidate
// const deleteEmp = () => {

//     const sql = `DELETE FROM employee WHERE id = ?`;
//     const params = [req.params.id];

//   inquirer([
//       {
//       type: 'list',
//       name: 'name_select',
//       message: 'Please select an employee you would like to delete',
//       choices: viewAllEmp
//     }
//   ])

//   .then((data) => {
//       let id;
//       for (let i = 0; i < viewAllEmp.length; i++) {
//           if (data.id === viewAllEmp[i]) {
//               id = i +1;
//           }
//       };
//   })

//   let newViewAllEmp = data.name_select.filter(item => item.id !== id );

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'employee not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// };




module.exports = { viewAllEmp, viewEmpByDept, viewEmpByMang, deleteEmp };