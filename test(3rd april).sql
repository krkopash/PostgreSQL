create table items(
id serial primary key,
product varchar (50),
price numeric not null,
discount numeric
);

insert into items (product, price, discount) values('a', 1000, 10),
('b', 2000, 20),
('c', 3000, 10),
('d', 1000, null),
('e', 5000, 25)

--------case,COALESCE, CAST
select product, price ,
case
when price > 4000 then 'high'
when price >3000 then 'medium'
when price>1000 then 'low'
else 'very low'
end as price_category 
from items order by price desc

select product, (price-discount) as fp from items;

--coalesce --- return price if discount is null
SELECT
    product,
    (price - COALESCE(discount, 0)) AS net_price
FROM
    items;

SELECT COALESCE(NULL, null);


---nullif
select nullif(1,3);

--return null if discount is null
select price, product, price/nullif(discount, 0) as ratio from items

--return price if discount is null(coalesce+nullif)
select price, product, coalesce(price/nullif(discount, 0), price) as ratio from items


select cast('a' as text);
    
select cast ('{"name": "user1"}' as text);


---role
create role test login password 'test';
create role u1 login password 'test';
create role user1 superuser login password 'test';