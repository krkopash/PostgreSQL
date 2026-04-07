--trigger
create or replace function log_action()
returns trigger as $$
begin raise notice 'row updated';
return new;
end;
$$
language plpgsql;

create trigger update_trigger
after update on products
for each row execute function log_action();

update products set price=100 where product_id =5;



alter table users
add column created_at timestamp default current_timestamp,
add column updated_at timestamp default current_timestamp;


create or replace function update_timestamp()
returns trigger as $$
begin
new.updated_at = current_timestamp;
raise notice 'user updated';
return new;
end;
$$ language plpgsql;

create or replace trigger set_timestamp
before update on users
for each row
execute function update_timestamp();

update users set name='user1' where id=1;

insert into users (name,email,age) values ('user4', 'user4@gmail.com', 20);


--before
create or replace function before_uppercase()
returns trigger as $$
begin
new.name=upper(new.name);
return new;
end;
$$ language plpgsql;

create or replace trigger before_upper
before insert on users 
for each row
execute function before_uppercase();

insert into users(name,email,age) values ('before', 'before@gmail.com', 20);

--after
create or replace function after_uppercase()
returns trigger as $$
begin
new.name=upper(new.name);
raise notice 'after trigger: %', new.name;
return new;
end;
$$ language plpgsql;

create or replace trigger after_upper
after insert on users
for each row
execute function after_uppercase();

insert into users(name,email,age) values ('after', 'after@gmail.com', 20);
delete from users where name='BEFORE';

insert into users(name,email,age)
values ('testuser', 't@gmail.com', 20);


drop trigger before_upper on users;




--instead of
create view user_view as select id, name, email, age from users;

create or replace function insert_user_view()
returns trigger as $$
begin
insert into users(name) values (new.name);
return new;
end;
$$ language plpgsql;

create trigger instead_insert_user
instead of insert on user_view
for each row
execute function insert_user_view();

select * from user_view;
insert into user_view(name) values ('testuser');



--row level
create or replace function row_level()
returns trigger as $$
begin 
raise notice 'row_level trigger: %', new.id;
return new;
end;
$$ language plpgsql;

create or replace trigger row_trigger
after update on users
for each row execute function row_level();

update users set age=age+1;

--statement level
create or replace function stmt_level()
returns trigger as $$
begin
raise notice 'stmt level';
return null;
end;
$$ language plpgsql;

create or replace trigger stmt_level
after update on users
for each statement execute function stmt_level();

drop trigger row_trigger on users;
update users set age=age+1;