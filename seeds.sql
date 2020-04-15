-- Premade starter sql 

USE employeeTracker_DB;

-- premade deparetments
INSERT INTO department (department_name)
VALUES ("Engineering"),
("Sales"),
("Legal"),
("Finance");

-- premade roles
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 100000.00, 1),
("Salesman", 35000 , 2),
("Sales Lead", 50000.00, 2),
("Lawyer", 100001, 3),
("Accountant", 55000.00, 4);

-- making an employee with no manager
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Paul", "Lee", 1);

-- making an employee with a manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 4, 1);
