<<<<<<< HEAD
--control flow
-- id | product | price | discount
-- ----+---------+-------+----------
--   1 | a       |  1000 |       10
--   2 | b       |  2000 |       20
--   3 | c       |  3000 |       10
--   4 | d       |  1000 |
--   5 | e       |  5000 |       25

select * from items
insert into items( product, price, discount) values ('f', 500, 50);

--if
create function check_number(num INT)
returns text as $$
declare result text;

begin if num>0 then result:='positive';
elseif num<0 then result:='negative';
else result:='zero';
end if;
return result;
end;
$$ language plpgsql;

select check_number(-3);


--query
select product, price, discount, case
when price>3000 then 'high'
when price between 1000 and 3000 then 'medium'
else 'low'
end as pc from items;
rollback;
--loop + end(exit)
--1 to n
do $$
declare endn integer :=11;
startn integer:=1;
begin 
loop
exit when startn=endn;
raise notice 'value: %', startn;
startn:=startn+1;
end loop;
end; 
$$;

--n to 1
do $$
declare endn integer:=0;
startn integer :=10;
begin
loop
exit when startn =endn;
raise notice 'value:%', startn;
startn:=startn-1;
end loop;
end;
$$;


--continue (even)
do $$
declare num int=0;
begin
loop
num = num+1;
exit when num>10;
continue when mod(num,2)=1; --if mod(num,1)=0 ---odd / num=6(for skip 6)
raise notice '%', num;
end loop;
end;
$$;

--while
do $$
declare
add integer := 0;
begin
while add <10 loop
raise notice 'n= %', add;
add := add+1;
end loop;
end$$;


--json data
create table jsondata(
id serial primary key, userinfo jsonb);

insert into jsondata(userinfo) values ('{"key1": "value1", "key2": 111}');

select * from jsondata;
--access value
select userinfo->>'key1' from jsondata;
select userinfo->>'key2' from jsondata;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_name TEXT
);

insert into orders(product_name) values ('p1');
insert into orders(product_name) values ('p2');
=======
--control flow
-- id | product | price | discount
-- ----+---------+-------+----------
--   1 | a       |  1000 |       10
--   2 | b       |  2000 |       20
--   3 | c       |  3000 |       10
--   4 | d       |  1000 |
--   5 | e       |  5000 |       25

select * from items
insert into items( product, price, discount) values ('f', 500, 50);

--if
create function check_number(num INT)
returns text as $$
declare result text;

begin if num>0 then result:='positive';
elseif num<0 then result:='negative';
else result:='zero';
end if;
return result;
end;
$$ language plpgsql;

select check_number(-3);


--query
select product, price, discount, case
when price>3000 then 'high'
when price between 1000 and 3000 then 'medium'
else 'low'
end as pc from items;
rollback;
--loop + end(exit)
--1 to n
do $$
declare endn integer :=11;
startn integer:=1;
begin 
loop
exit when startn=endn;
raise notice 'value: %', startn;
startn:=startn+1;
end loop;
end; 
$$;

--n to 1
do $$
declare endn integer:=0;
startn integer :=10;
begin
loop
exit when startn =endn;
raise notice 'value:%', startn;
startn:=startn-1;
end loop;
end;
$$;


--continue (even)
do $$
declare num int=0;
begin
loop
num = num+1;
exit when num>10;
continue when mod(num,2)=1; --if mod(num,1)=0 ---odd / num=6(for skip 6)
raise notice '%', num;
end loop;
end;
$$;

--while
do $$
declare
add integer := 0;
begin
while add <10 loop
raise notice 'n= %', add;
add := add+1;
end loop;
end$$;


--json data
create table jsondata(
id serial primary key, userinfo jsonb);

insert into jsondata(userinfo) values ('{"key1": "value1", "key2": 111}');

select * from jsondata;
--access value
select userinfo->>'key1' from jsondata;
select userinfo->>'key2' from jsondata;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_name TEXT
);

insert into orders(product_name) values ('p1');
insert into orders(product_name) values ('p2');
>>>>>>> fe7b663827160234e6ecc93a0ea52dbf50429ab1
select * from orders;