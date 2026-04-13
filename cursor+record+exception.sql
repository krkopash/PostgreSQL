-----2.cursor	
do $$
declare user_rec record;
begin for user_rec in select * from users loop
raise notice 'name: %, age: %, email: %',
user_rec.name, user_rec.age, user_rec.email;
end loop;
end $$;

----with condition
do $$
declare user_rec record;
begin for user_rec in select * from users where age>25 loop
raise notice 'name: %, age: %',
user_rec.name, user_rec.age;
end loop;
end $$;

----handle null values
do $$
declare user_rec record;
begin for user_rec in select * from users loop
raise notice 'name: %, email: %, age: %',
user_rec.name, 
coalesce (user_rec.email, 'no email'),
coalesce (user_rec.age::text, 'no age defined');
end loop;
end $$;

-----explicit cursor
do $$
declare
user_cursor cursor for select name, email, age from users;
v_name text;
v_email text;
v_age int;
begin open user_cursor;
loop fetch user_cursor into v_name, v_email, v_age;
exit when not found;
raise notice 'name: %, email: %, age: %', v_name, coalesce(v_email, 'no email'), coalesce(v_age::text, 'no age');
end loop;
close user_cursor;
end $$;



----explicit cursot with parameter
do $$
declare min_age int:=25;
user_cursor cursor for select name, age from users where age>min_age;
v_name text;
v_age int;
begin open user_cursor;
loop fetch user_cursor into v_name, v_age;
exit when not found;
raise notice 'user: %, age: %', v_name, v_age;
end loop;
close user_cursor;
end $$;



---update user cursor
do $$
declare user_cursor cursor for select id, name from users;
v_id int, v_name text;
begin open user_cursor;
loop
fetch user_cursor into v_id, v_name;
exit when not found;
update users set name=lower(v_name)
where id=v_id;
end loop;
close user_cursor;
end $$;



do $$
declare user_cursor cursor for select id, name, email from users;
v_id int;
v_name text;
v_email text;
begin open user_cursor;
loop
fetch user_cursor into v_id, v_name, v_email;
if v_email is not null then raise notice 'sending mail % (%): hello %!',
v_email, v_id, v_name;
else
raise notice 'skipping user % (no email) % ', v_id, v_name;
end if;
end loop;
close user_cursor;
end $$;



---manual cursor
do $$
declare user_cursor cursor for select name from users;
user_name text;
begin open user_cursor;
loop fetch user_cursor into user_name;
exit when not found;
raise notice 'user: %', user_name;
end cloop;
close user_cursor;
end $$;











-------record
DO $$
DECLARE
    user_rec users%ROWTYPE;
BEGIN
    SELECT * INTO user_rec
    FROM users
    WHERE id = 1;

    RAISE NOTICE '% | % | %',
        user_rec.name,
        user_rec.email,
        user_rec.age;
END $$;





-----table based record
do $$
declare user_rec users%rowtype;
begin
select * into user_rec from users where id=1;
raise notice 'id: %, mail: %, age: %',
user_rec.name, user_rec.email, user_rec.age;
end $$;

----loop
do $$
declare user_rec users%rowtype;
begin
for user_rec in (select * from users) loop
raise notice '% and % | % ,',
user_rec.name, user_rec.email, user_rec.age;
end loop;
end $$;






------Join + Cursor Record
DO $$
DECLARE
    user_cur CURSOR FOR
        SELECT name, email FROM users;

    user_rec RECORD;
BEGIN
    OPEN user_cur;

    LOOP
        FETCH user_cur INTO user_rec;
        EXIT WHEN NOT FOUND;

        RAISE NOTICE '% - %',
            user_rec.name,
            user_rec.email;
    END LOOP;

    CLOSE user_cur;
END $$;






------3. exception handling
-----system defined exception
do $$
declare 
a integer:=10;
b integer:= 0;
c integer;
begin
c:=a/b;
exception when division_by_zero then
raise notice 'error division by zero is not allowed';
end $$;


-----named system exception
-----unique_violation
do $$
begin insert into users values (3, null, 'user2@gmail.com', 27);
exception when not_null_violation then raise notice 'null value not allowed';
end $$;


----type mismatch
do $$
begin perform 'test'::integer;
exception when invalid_text_representation then raise notice 'type mismatched';
end $$;

----too many rows
do $$
declare rec record;
begin select * into rec from users;
exception when too_many_rows then raise exception 'returned multiple row';
end $$;


----user define exception
do $$
declare x int:=10;
y int:=0;
begin
if y=0 then raise exception 'division by zero';
end if;
exception when others then raise notice 'handle error: %',sqlerrm;
end $$;