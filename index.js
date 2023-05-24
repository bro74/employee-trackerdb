const inquirer = require('inquirer');
const mysql = require('mysql2');


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
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", 
            "Add a Role", "Add an Employee", "Update an Employee Role"]
    
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
    