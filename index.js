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
          "update an employee role",
          "update an employee manager",
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
        case "update an employee role":
          updateRole();
          break;
        case "update an employee manager":
          updateManager();
      }
    });
}

function viewEmp() {
  connection.query(
    "SELECT employee.id, first_name, last_name, role.title, department.department_name, role.salary, manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id",
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
  let rolesArr = []
  let managerArr = []
  connection.query("SELECT * FROM role", function(err, data){
    if(err) throw err;
    data.forEach(role => {
      rolesArr.push(role.title)
    })
  })
  connection.query("SELECT * FROM employee", function(err, data){
    if(err) throw err;
    data.forEach(manager => {
      managerArr.push(manager.first_name)
    })
    managerArr.push("No one")
  })
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
            type: "list",
            message: "What is their role?",
            choices: rolesArr,
            name: "newRole"
        },
        {
          type: "list",
          message: "Who is there manager?",
          choices: managerArr,
          name: "newManager"
        }
    ]).then(function(answer){
      if (answer.newManager === "No one"){
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", [answer.newFirst, answer.newLast, answer.newRole], function(err, data){
          if (err) throw err;

          console.log("New employee created!")
          askQuestion();
        })
      } else {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newFirst, answer.newLast, answer.newRole, answer.newManager], function(err, data){
          if (err) throw err;

          console.log("New employee created!")
          askQuestion();
      })
    }
})
}

function createRole() {
  let deptArr = []
  connection.query("SELECT * FROM department", function(err, data){
    if(err) throw err;
    data.forEach(dept => {
      deptArr.push(dept.department_name)
    })
  })
  inquirer.prompt([
    {
      type: "input",
      message: "What is the new role?",
      name: "newRole"
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "newSalary"
    },
    {
      type: "list",
      message: "What department is it apart of?",
      choices: deptArr,
      name: "newDept"
    }
  ]).then(function(answer){
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [answer.newRole, answer.newSalary, answer.newDept], function(err, data){
      if(err) throw err;

      console.log("New role created!")
      askQuestion();
    })
  })
}

function createDep() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the new department??",
      name: "newDept"
    }
  ]).then(function(answer){
    connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.newDept], function(err, data){
      if(err) throw err;

      console.log("New department created!")
      askQuestion();
    })
  })
}

function updateRole(){
  let empArr = []
  connection.query("SELECT * FROM employee", function(err, data){
    if(err) throw err;
    data.forEach(employee => {
      empArr.push(employee.first_name)
    })
  })
  let rolesArr = []
  connection.query("SELECT * FROM role", function(err, data){
    if(err) throw err;
    data.forEach(role => {
      rolesArr.push(role.title)
    })
  })
  inquirer.prompt([
    {
      type: "list",
      message: "Who do you want to update?",
      choices: empArr,
      name: "empChoice"
    },
    {
      type: "list",
      message: "Which role do you want to change to?",
      choices: rolesArr,
      name:"newRole"
    }
  ]).then(function(answer){
    connection.query("UPDATE employee SET role_id = ? WHERE ? = ", [answer.newRole, answer.empChoice, employee], function(err, data){
      if(err) throw err;

      console.log("Employee role updated!")
    })

  })
}

function updateManager(){
  let empArr = []
  connection.query("SELECT * FROM employee", function(err, data){
    if(err) throw err;
    data.forEach(employee => {
      empArr.push(employee.first_name)
    })
  })
  let managerArr = []
  connection.query("SELECT * FROM employee", function(err, data){
    if(err) throw err;
    data.forEach(manager => {
      managerArr.push(manager.first_name)
    })
    managerArr.push("No one")
  })
  inquirer.prompt([
    {
      type: "list",
      message: "Who do you want to update?",
      choices: empArr,
      name: "empChoice"
    },
    {
      type: "list",
      message: "Who is the new manager?",
      choices: managerArr,
      name:"newManager"
    }
  ]).then(function(answer){
    connection.query("UPDATE employee SET manager_id = ? WHERE ? = ", [answer.newManager, answer.empChoice, employee], function(err, data){
      if(err) throw err;

      console.log("Employee manager updated!")
    })

  })
}