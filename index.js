const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "password",
  database: "employeeTracker_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  askQuestion();
});

function askQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "choose an option",
        choices: [
          "view employees",
          "view roles",
          "view departments",
          new inquirer.Separator(),
          "create new employee",
          "create new role",
          "create new department",
          new inquirer.Separator(),
          "update an employee",
          new inquirer.Separator(),
        ],
        name: "userChoice",
      },
    ])
    .then(function (answer) {
      switch (answer.userChoice) {
        case "view employees":
          viewEmp();
          break;
        case "view roles":
          viewRole();
          break;
        case "view departments":
          viewDep();
          break;
        case "create new employee":
          createEmp();
          break;
        case "create new role":
          createRole();
          break;
        case "create new department":
          createDep();
          break;
        case "update an employee":
          updateEmp();
          break;
      }
    });
}

function viewEmp() {
  connection.query(
    "SELECT employee.id, first_name, last_name, role.title, role.department_id, role.salary, manager_id FROM employee JOIN role ON employee.role_id = role.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      askQuestion();
    }
  );
}

function viewRole() {
  connection.query(
    "SELECT title, salary, department_name FROM role JOIN department ON department_id = department.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      askQuestion();
    }
  );
}

function viewDep() {
    connection.query(
        "SELECT * FROM department",
        function (err, res) {
          if (err) throw err;
          console.table(res);
          askQuestion();
        }
      );
}

function createEmp() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "newFirst"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "newLast" 
        },
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "newFirst"
        }
    ])
}

// function createRole() {}

// function createDep() {}

// function updateEmp() {}
