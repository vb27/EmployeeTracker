const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

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
        ],
        name: "userChoice",
      },
    ])
    .then(function (answer) {
      switch (userChoice) {
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
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    askQuestion();
  });
}

function viewRole() {}

function viewDep() {}

function createEmp() {}

function createRole() {}

function createDep() {}

function updateEmp() {}
