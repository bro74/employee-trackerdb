const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');


// connection to mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'newmysql',
    database: 'employeetracker_db'

});

//contection to inquire
function promptList() {
    inquirer
    .prompt ([
    
        {
            type: 'list',
            message: 'What do you want to view?',
            name: 'viewAll',
            choices: ["View All Departments", "View All Roles", "View All Employees",]
    
        },
    ]).then(answer => {
        switch(answer.viewAll) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                 addEmployee();
                 break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;    
        }
       });
    };
    
    promptList();
    // displays on screen
    function viewDepartments() {
        db.query('SELECT id as "Department ID", names as "Departments" FROM departments', (err, results) => {
            if (err) {
                throw err;
            } 
            console.table(results);
            promptList();
        });
    };
    function viewRoles() {
        db.query('SELECT roles.title AS "Job Title", roles.id AS "Role ID", departments.names AS "Department", roles.salary AS "Salary" FROM roles INNER JOIN departments ON roles.department_id = departments.id', (err, results) => {
            if (err) {
                throw err;
            }
            console.table(results);
            promptList();
        });
    };
    
    function viewEmployees() {
        db.query('SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", departments.names AS "Department", roles.salary AS "Salary", CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id', (err, results) => {
            if (err) {
                throw err
            }
            console.table(results)
            promptList();
        });
    };
    