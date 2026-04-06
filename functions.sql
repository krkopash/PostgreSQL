--product_above_price
create function get_products_above_price(p_price numeric)
returns table(product_name varchar, group_id int, price numeric)
language sql
as $$
select product_name, group_id, price
from products
where price > p_price;
$$;
select * from get_products_above_price(100);

--by_group
create function get_products_by_group(p_group_id int)
returns table( product_id int,product_name varchar, price numeric)
language sql
as $$
select product_id, product_name, price
from products
where group_id = p_group_id;
$$;
select * from get_products_by_group(2);

--avg
create function avg_bygrp(p_group_id int)
returns numeric
language sql
as $$
select avg(price) from products
where group_id = p_group_id;
$$;
select * from avg_bygrp(1);


--sum
create function add_num(a int, b int)
returns int as $$
begin return a+b;
end;
$$ language plpgsql;
select add_num(10,8);

--even-odd
create function even_odd(num int)
returns text as $$
begin
if num%2=0 then return 'even';
else return 'odd';
end if;
end;
$$ language plpgsql;
select even_odd(5);

--factorial
create or replace function fact(n int)
returns int as $$
declare 
result int:=1;
i int;
begin for i in 1..n loop
result:= result *i;
end loop;
return result;
end;
$$ language plpgsql;
select fact(5);

--prime
create or replace function prime(n int)
returns text as $$
declare i int;
begin
if n<=1 then
return 'not prime';
end if;
for i in 2..n-1 loop
if n%i=0 then return 'not prime';
end if;
end loop;
return 'prime';
end;
$$ language plpgsql;
select prime(5);

--reverse
create or replace function reverse_num(n int)
returns int as 
$$
declare rev int:=0;
begin
while n>0 loop
rev:=rev*10 + (n%10);
n:=n/10;
end loop;
return rev;
end;
$$
language plpgsql;
select reverse_num(1233);

--sum digit
create function sum_digit(n int)
returns int as $$
declare sum int:=0;
begin
while n>0 loop
sum:=sum+(n%10);
n:=n/10;
end loop;
return sum;
end;
$$ language plpgsql;

select sum_digit(12445);


--fibonacci
create or replace function fib(n int)
returns int as $$
declare a int:=0;
b int:=1;
temp int;
i int;
begin for i in 1..n loop
temp:=a+b;
a:=b;
b:=temp;
end loop;
return a;
end;
$$ language plpgsql;

select fib(1);