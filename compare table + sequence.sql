--***********compare table + sequence


-------------compare table
CREATE TABLE comp1 (
    ID INT PRIMARY KEY,
    NAME VARCHAR (50)
);

CREATE TABLE comp2 (
    ID INT PRIMARY KEY,
    NAME VARCHAR (50)
);

INSERT INTO comp1 (ID, NAME)
VALUES
    (1, 'a'),
    (2, 'b');

);
INSERT INTO comp2 (ID, NAME)
VALUES
    (1, 'a'),
    (2, 'b');

--update
update comp2 set name='c' where id=2;

--suing except
SELECT ID, NAME,
    'not in comp2' AS note
FROM
    comp1
EXCEPT
    SELECT ID, NAME,
        'not in comp2' AS note
    FROM
        comp2;


--using full outer join
select id, name from comp1 full outer join comp2 using(id,name)
where comp1.id is null or comp2.id is null

--count number of differences
select count(*) from comp1 full outer join comp2 using(id, name)
where comp1.id is null or comp2.id is null




CREATE SEQUENCE mysequence
INCREMENT 5
	START 10;

SELECT nextval('mysequence');

CREATE SEQUENCE loop
increment -1
minvalue 1  maxvalue 5
START 3
CYCLE;

select nextval('loop');
select currval('loop');
select setval(3);