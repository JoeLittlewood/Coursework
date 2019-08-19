# Section two - Database Design (20 points)

> Joe L, 40417692

----

## Extending the ER diagram to accomodate Customer Account Managers (CAM's)

![ER Diagram for section two](haulage.drawio.png)

In order to introduce a customer account manager, I had to remove the driver table as they are no-longer the only employees. I replaced the driver table with an employee table and introduced an attreibute of 'role' that will describe the role of that employee, whether they are a driver or a CAM. One unique attribute that belonged to the driver table was whether they could carry hazardous goods or not. In order to satisfy this requirment, I introduced a certificates table where this certificate, along with any additional certificates that may be acquired in the future, can be stored. So that a customer's CAM can be identified at any time, I placed a cam_id attribute in the customer table which is a direct reference to an employee number. This can also be seen in the manifest table so that any CAM can be identified as being responsible for any trip.

I have made it so that one customer has to have a CAM at all times but a CAM can manage many customers at one time. Similarly, a CAM can be responsible for many manifest items.

## Alter the database to inlcude any additional tables and attributes

```SQL
-- Adds cam_id to table.
ALTER TABLE customer
ADD cam_id integer not null
AFTER contact_email;

-- Creates employee table.
CREATE TABLE employee(
    employee_no integer auto_increment primary key,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
    ni_no varchar(13),
    telephone varchar(20),
    mobile varchar(20),
    role varchar(6)
);

-- Makes cam_id a foreign key.
ALTER TABLE customer
ADD FOREIGN KEY (cam_id)
REFERENCES employee(employee_no);

-- Adds cam_id to manifest table.
ALTER TABLE manifest
ADD cam_id integer not null
AFTER weight;

-- Makes cam_id a foreign key.
ALTER TABLE manifest
ADD FOREIGN KEY (cam_id)
REFERENCES employee(employee_no);

-- Creates certificates table.
CREATE TABLE certificates(
    certificate_id integer auto_increment primary key,
    employee_no integer not null,
    certificate_type varchar(20),
    achievement_date date,
    expiry_date date
);

-- Makes employee_no foreign key.
ALTER TABLE certificates
ADD FOREIGN KEY (employee_no)
REFERENCES employee(employee_no);

-- Removes the current foreign key.
ALTER TABLE trip
DROP FOREIGN KEY trip_ibfk_2;

-- Changes the type for employee to integer.
CHANGE employee_no employee_no integer;

-- Removes the driver table.
DROP TABLE driver;



-- create table query(
--     query_id integer auto_increment primary key,
--     response_id integer not null,
--     foreign key (query_id) references query(query_id),
--     foreign key (response_id) references response(response_id)
-- );
-- create table response(
--     response_id integer auto_increment primary key,
--     date_created datetime,
--     query_id integer not null,
--     content text,
--     cam_id integer not null,
--     foreign key (query_id) references query_state(query_id),
--     foreign key (cam_id) references employee(employee_no)
-- );
-- create table query_state(
--     query_state text primary key,
--     query_id integer not null,
--     response_id integer not null,
--     foreign key (query_id) references query(query_id),
--     foreign key (response_id) references response(response_id)
-- );
-- create table response(
--     response_id integer auto_increment primary key,
--     date_created datetime,
--     query_id integer not null,
--     content text,
--     cam_id integer not null,
--     foreign key (query_id) references query_state(query_id),
--     foreign key (cam_id) references employee(employee_no)
-- );
...
```

----

## Insert sample data for at least three customers and their cam's

Employee table:

```sql
insert into employee (first_name, last_name, ni_no, telephone, mobile, role)
values(
    'Carlos',
    'Coronel',
    'AA 12 34 56 B',
    '0165 6727840',
    '07659 9770175',
    'driver'); -- Added role
insert into employee (first_name, last_name, ni_no, telephone, mobile, role)
values(  
    'Vicky',
    'Feilding',
    'BB 12 34 56 C',
    '0165 6727840',
    '07659 9770175',
    'cam'); -- Added role
insert into employee (first_name, last_name, ni_no, telephone, mobile, role)
values(
    'Alissa',
    'McWhinnie',
    'CC 12 34 56 D',
    '0165 6727840',
    '07659 9770175',
    'driver'); -- Added role
...
```

After pasting this command, I realised I had input the telephone number in an incorrect format; so I used the following command to make this right:

```sql
UPDATE employee SET telephone = '01656 727840' WHERE employee_no = 1 OR 2 OR 3;
```

Certificates table:

```sql
insert into certificates (employee_no, certificate_type, achievement_date, expiry_date)
values(
    '1',
    'Hazerdous Goods',
    '2012-03-01',
    '2013-03-01');
insert into certificates (employee_no, certificate_type, achievement_date, expiry_date)
values(
    '2',
    'Customer Service',
    '2012-04-11',
    '2013-04-11');
insert into certificates (employee_no, certificate_type, achievement_date, expiry_date)
values(
    '3',
    'Hazardous Goods',
    '2012-02-21',
    '2013-02-21');
...
```

Customer table:

```sql
insert into customer (company_name,
    address,
    town,
    post_code,
    telephone,
    contact_fname,
    contact_sname,
    contact_email,
    cam_id)
values(
    'Calash Ltd.',  
    '88 Rinkomania Lane',
    'Cardigan',
    'SA55 8BA',
    '01167 1595763',
    'Cameron',
    'Dunnico',
    'c.dunnico@calash.co.uk',
    '2');
insert into customer (company_name,
    address,
    town,
    post_code,
    telephone,
    contact_fname,
    contact_sname,
    contact_email,
    cam_id)
values(
    'Stichomancy & Co',  
    '17 Suspiration Street',
    'Okehampton',
    'EX48 4CG',
    '01450 2312678',
    'Henry',
    'Petts',
    'h.petts@stichomancy.co.uk',
    '2');
insert into customer (company_name,
    address,
    town,
    post_code,
    telephone,
    contact_fname,
    contact_sname,
    contact_email,
    cam_id)
values(
    'Trochiline Services',  
    '15 Upcast Street',
    'Carrbridge',
    'PH24 0BF',
    '01222 9556982',
    'Richard',
    'Hanford',
    'r.hanford@trochiline.co.uk',
    '2');
...
```

Manifest table:

```sql
insert into manifest (trip_id,
    barcode,
    weight,
    category,
    pickup_customer_ref,
    delivery_customer_ref,
    cam_id)
select 73927,
    259979829,
    299,
    'A',
    c1.reference,
    c2.reference,
    '2'
from customer c1, customer c2
where c1.company_name = 'Officialism & Co'
    and c2.company_name = 'Splenium Industrial';

insert into manifest (trip_id,
    barcode,
    weight,
    category,
    pickup_customer_ref,
    delivery_customer_ref,
    cam_id)
select 73928,
    722529999,
    2861,
    'A',
    c1.reference,
    c2.reference,
    '2'
from customer c1, customer c2
where c1.company_name = 'Splenium Industrial'
    and c2.company_name = 'Cocket Services';

insert into manifest (trip_id,
    barcode,
    weight,
    category,
    pickup_customer_ref,
    delivery_customer_ref,
    cam_id)
select 73929,
    395486229,
    1037,
    'A',
    c1.reference,
    c2.reference,
    '2'
from customer c1, customer c2
where c1.company_name = 'Splenium Industrial'
    and c2.company_name = 'Eulogomania Group';
...
```

## Querying the database

Find the CAM who was in charge of a particular trip:

```sql
SELECT manifest.cam_id, employee.first_name, employee.last_name
FROM employee
INNER JOIN manifest
ON manifest.cam_id = employee.employee_no
WHERE trip_id = 73929;
```

Output:

```sh
+--------+------------+-----------+
| cam_id | first_name | last_name |
+--------+------------+-----------+
|      2 | Vicky      | Feilding  |
+--------+------------+-----------+
```

Identify a customer's current cam:

```sql
SELECT customer.company_name, employee.first_name, employee.last_name
FROM employee
INNER JOIN customer
ON customer.cam_id = employee.employee_no
WHERE customer.reference = 301;
```

Output:

```sh
+--------------+------------+-----------+
| company_name | first_name | last_name |
+--------------+------------+-----------+
| Calash Ltd.  | Vicky      | Feilding  |
+--------------+------------+-----------+
```

Add customer query to DB:

```sql
```

Show all history of query including follow up's in chronilogical order:

```sql
```

Calculate a performance rating:

```sql
```
