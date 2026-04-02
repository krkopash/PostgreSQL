--join + table query
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE student_courses(
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (student_id, course_id)
);

insert into students(student_id, name) values
('1', 'user1');
('2', 'user2');
('3', 'user3');

insert into courses(course_id, title) values
('3', 't3');


--select
select name from users

select name, AVG(age) AS avg_age
from users group by name
--order by
select name, age from users order by age DESC;
--where+or
select name, age from users where name='user2' or age=19;
--fetch
select age,name from users order by age fetch first 2 row only;
--IN
select age, name from users where age IN(15, 18, 19)
ORDER BY age desc;
select age, name from users where age IN (select age from users where age=20);
--having
select sum(age) from users having age=19;
--between
select age from users where age between 15 and 19;

--copy table 
create table copytable as table users;
--copy table without data
create table wdcopy as table users with no data


create sequence three increment -1 minvalue 1
maxvalue 3
start 3
select nextval('three');

SELECT s.name, c.title
FROM students s
JOIN student_courses sc ON s.student_id = sc.student_id
JOIN courses c ON sc.course_id = c.course_id;

select students.name, courses.title from students INNER JOIN courses
on student_id=course_id


select students.name, courses.title from students left JOIN courses
on student_id=course_id


select students.name, courses.title from students right JOIN courses
on student_id=course_id




-----------update

CREATE TABLE userstable (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  balance INT
);

insert into userstable (name, balance) values
('user1', 1000),
('user2', 2000),
('user3', 3000);

select * from userstable

update userstable set balance = balance - 100 where id=1;
update userstable set balance = balance - 100 where name='user1';

update userstable set balance =1000;

begin;

update userstable set balance = balance - 100 where id=1;
update userstable set balance = balance - 100 where name='user1';
commit;

select * from userstable

ALTER DATABASE tutorial rename to newtest;


