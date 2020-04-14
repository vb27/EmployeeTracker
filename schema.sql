DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE database employeeTracker_DB;
USE employeeTracker_DB;

-- table to make employees
-- role_id will match the roles id
-- manager_id will match to the employee id
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

-- department-id will match the department id
CREATE TABLE role (
    id INT AUTO_INCREMENTNOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10.2) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);