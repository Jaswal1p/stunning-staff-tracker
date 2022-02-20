const inquirer = require('inquirer');
const express = require('express');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const promptUser = () => {
    console.log(`
    ================
    Employee Tracker
    ================
    `);

    inquirer 
    // This is a section of initial prompts as required by assignment
    .prompt({
        type: 'list',
        name: 'all choices',
        message: 'This Command-line Application can help you with following choices. Please pick one',
        choices: [
            'View all department',
            'View all role',
            'View all employee',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'delete an employee',
            'View all employee by department',
            'View all employee by manager',
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
            case 'delete an employee':
                deleteEmp();
                break;
            case 'Update an employee role':
                upEmp();
                break;
            case 'View all employee by department':
                viewEmpByDept();
                break;
            case 'View all employee by manager':
                viewEmpByMang();
                break;    
            case 'Finished':
                break;     
                        
        }
    })
}







// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// Section for exporting this module comprised of many individual methods
module.exports = { promptUser }
const { viewAllEmp, viewEmpByDept, viewEmpByMang, addEmp, upEmp, deleteEmp } = require('./lib/employee-methods');
const { viewAllDep, addDep } = require('./lib/department-methods');
const { viewAllRole, addRole } = require('./lib/role-methods');


promptUser()
