---subquery, 
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);


INSERT INTO employees (name, department, salary) VALUES
('user1', 'IT', 60000),
('user2', 'IT', 75000),
('user3', 'HR', 50000),
('user4', 'HR', 65000),
('user5', 'Finance', 50000),
('user6', 'Finance', 70000);

--Subqueries
---max salary
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

--max from dept
select * from employees e1 where salary=(
select max(salary) from employees e2 where e1.department =e2.department
)