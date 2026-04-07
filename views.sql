<<<<<<< HEAD
--view
CREATE TABLE employees (
id SERIAL PRIMARY KEY,
name TEXT,
salary INT,
department TEXT);

CREATE VIEW high_salary_employees AS
SELECT name, salary
FROM employees
WHERE salary > 50000;

SELECT * FROM high_salary_employees;

--join
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    dept_name TEXT
);

CREATE VIEW employee_details AS
SELECT e.name, e.salary, d.dept_name
FROM employees e
JOIN departments d
ON e.department = d.dept_name;

SELECT * FROM employee_details;


--security
CREATE VIEW public_employee_info AS
SELECT name, department
FROM employees;

GRANT SELECT ON public_employee_info TO public;

--updatble
CREATE VIEW emp_view AS
SELECT id, name, salary
FROM employees;
UPDATE emp_view
SET salary = 60000
WHERE id = 1;
select * from emp_view;

--aggregation
CREATE VIEW dept_salary_summary AS
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

SELECT * FROM dept_salary_summary;

--replace
CREATE OR REPLACE VIEW high_salary_employees AS
SELECT name, salary, department
FROM employees
WHERE salary > 60000;
select * from high_salary_employees;

--drop
=======
--view
CREATE TABLE employees (
id SERIAL PRIMARY KEY,
name TEXT,
salary INT,
department TEXT);

CREATE VIEW high_salary_employees AS
SELECT name, salary
FROM employees
WHERE salary > 50000;

SELECT * FROM high_salary_employees;

--join
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    dept_name TEXT
);

CREATE VIEW employee_details AS
SELECT e.name, e.salary, d.dept_name
FROM employees e
JOIN departments d
ON e.department = d.dept_name;

SELECT * FROM employee_details;


--security
CREATE VIEW public_employee_info AS
SELECT name, department
FROM employees;

GRANT SELECT ON public_employee_info TO public;

--updatble
CREATE VIEW emp_view AS
SELECT id, name, salary
FROM employees;
UPDATE emp_view
SET salary = 60000
WHERE id = 1;
select * from emp_view;

--aggregation
CREATE VIEW dept_salary_summary AS
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

SELECT * FROM dept_salary_summary;

--replace
CREATE OR REPLACE VIEW high_salary_employees AS
SELECT name, salary, department
FROM employees
WHERE salary > 60000;
select * from high_salary_employees;

--drop
>>>>>>> fe7b663827160234e6ecc93a0ea52dbf50429ab1
DROP VIEW high_salary_employees;