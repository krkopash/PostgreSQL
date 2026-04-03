create table product_groups(
group_id serial primary key,
group_name varchar(50)
)
insert into product_groups (group_name) values ('elecronics'), ('books'), ('clothing');

create table products(
product_id serial primary key,
product_name varchar(50),
group_id int, price numeric,
foreign key (group_id) references product_groups(group_id)
);

INSERT INTO products (product_name, group_id, price) VALUES
    ('Laptop', 1, 1200),
    ('Smartphone', 1, 800),
    ('T-shirt', 2, 20),
    ('Jeans', 2, 50),
    ('Novel', 3, 15),
    ('Textbook', 3, 80);

insert into products (product_name, group_id,price) values ('shirt', 2, 20);

---rank()
select product_name, group_name, price, RANK() over (partition by group_name order by price asc)as rank
from products inner join product_groups using(group_id);

--dense_rank()
select product_name, group_name,price, dense_rank() over (partition by group_name order by price asc) as dense_rank
from products inner join product_groups using(group_id);

--row_number
select product_name, group_name, price, row_number() over (partition by group_name order by price asc)as rank
from products inner join product_groups using(group_id);

--nth value
select product_name, group_name, price, first_value(product_name) over (partition by group_name order by price asc)as rank
from products inner join product_groups using(group_id);

--lag
select product_name, group_name,price, lag(price, 1, 0) over (partition by group_name order by price asc)as prev
from products inner join product_groups using(group_id);

--lead
select product_name, group_name,price, lead(price) over (partition by group_name order by price asc)as prev
from products inner join product_groups using(group_id);

--percent_rank ------(rank - 1) / (total_rows - 1)
select product_name, group_name,price, percent_rank() over (partition by group_name order by price asc)as pr
from products inner join product_groups using(group_id);


--cume_dist -----(number of rows with value ≤ current row) / total rows
select product_name, group_name,price, cume_dist() over (partition by group_name order by price asc)as pr
from products inner join product_groups using(group_id);

--ntile
select product_name, group_name,price, ntile(4) over (partition by group_name order by price asc)as pr
from products inner join product_groups using(group_id);

