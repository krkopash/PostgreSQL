--  id | name  | department | salary
-- ----+-------+------------+--------
--   1 | user1 | IT         |  60000
--   2 | user2 | IT         |  75000
--   3 | user3 | HR         |  50000
--   7 | user1 | IT         |  60000
--   8 | user2 | IT         |  75000
--   9 | user3 | HR         |  50000
--  11 | user5 | Finance    |  50000
--   4 | user4 | other      |  65000
--  10 | user4 | other      |  65000


with high_salary as (select * from employees where salary>5000)
select * from high_salary;

select * from employees;

WITH def AS (
   select product, price ,
case
when price > 4000 then 'high'
when price >3000 then 'medium'
when price>1000 then 'low'
else 'very low'
end as price_category 
from items order by price desc
)
select * from def;

--multiple
with high_salary as (select * from employees where salary>(SELECT AVG(salary) FROM employees)), high_dept as(select * from employees where department='IT')
select * from high_dept;

--remove duplicat
with dup_users as (select id, row_number() over (partition by salary order by id) as rn from employees )
delete from employees where id in (select id from dup_users where rn>1)