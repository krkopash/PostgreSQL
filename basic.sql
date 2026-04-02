CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  age INT CHECK (age >= 18)
);
drop table orders


CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  pid VARCHAR(20)
);


select age from users group by 
name 
having age=19;




INSERT INTO users (name, email, age) VALUES
('user1', 'user1@gmail.com', 18),
('user2', 'user2@gmail.com', 19),
('user3', 'user3@gmail.com', 20);

select * from users;
TRUNCATE TABLE orders, users RESTART IDENTITY CASCADE;

INSERT INTO orders (pid) VALUES
('500');
('100');
('700');

SELECT MIN(AGE) FROM users
select max(age) from users
select sum(age) from users
SELECT * FROM users where age>19;

SELECT * FROM USERS WHERE age>19 OR name='user3';
select * from users where age>19 AND name='user2;


--size
SELECT pg_database_size('test')