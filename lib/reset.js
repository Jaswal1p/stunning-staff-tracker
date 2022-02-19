const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nahcYj-6fegwo-pifbyt',
    database: 'staffing'
});

const dropManager = () => {
    connection.query(
        `DROP TABLE IF EXITS manager`,
        function (err,results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('')
        }
    )
};

const createManagerTable = () => {
    connection.query(
        `CREATE TABLE manager (
            id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
            first_name VARCHAR(30),
            last_name VARCHAR(30)
        )`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('')
        }
    )
};

const addManager = () => {
    connection.query(
        `INSERT INTO manager (first_name, last_name)
        SELECT first_name, last_name
        FROM employee
        WHERE is_manager = 1`, 
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('')
        }
    )
};


module.exports = { dropManager, createManagerTable, addManager }