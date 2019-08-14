# Section two - Database Design (20 points)

> Joe L, 40417692

----

## Extending the ER diagram to accomodate Customer Account Managers (CAM's)

![ER Diagram for section two](haulage.drawio.png)

In order to introduce a customer account manager, I had to remove the driver table as they are no-longer the only employees. I replaced the driver table with an employee table and introduced an attreibute of 'role' that will describe the role of that employee, whether they are a driver or a CAM. One unique attribute that belonged to the driver table was whether they could carry hazardous goods or not. In order to satisfy this requirment, I introduced a certificates table where this certificate, along with any additional certificates that may be acquired in the future, can be stored. So that a customer's CAM can be identified at any time, I placed a cam_id attribute in the customer table which is a direct reference to an employee number. This can also be seen in the manifest table so that any CAM can be identified as being responsible for any trip.

I have made it so that one customer has to have a CAM at all times but a CAM can manage many customers at one time. Similarly, a CAM can be responsible for many manifest items.

## Alter the database to inlcude any additional tables and attributes

```SQL
drop table if exists manifest;
drop table if exists customer;
drop table if exists trip;
drop table if exists vehicle;
drop table if exists model;
drop table if exists category;
drop table if exists employee; -- Removed driver table and added employee table
drop table if exists certificates; -- Added cedrtificates table
drop table if exists query; -- Added query table
drop table if exists query_state; -- Added query_state table
drop table if exists response; -- Added response table

create table category (
    category varchar(1) primary key,
    description varchar(10) not null,
    requirement varchar(255)
);
create table model(
    model varchar(12) primary key,
    make varchar(10) not null,
    kerb integer,
    gvw integer
);
create table vehicle (
    vehicle_id integer auto_increment primary key,
    registration varchar(10) not null,
    model varchar(12) not null,
    year integer not null,
    body varchar(20),
    foreign key (model) references model(model)
);
create table trip(
    trip_id integer auto_increment primary key,
    departure_date datetime,
    return_date datetime,
    vehicle_id integer,
    employee_no varchar(7),
    foreign key (vehicle_id) references vehicle(vehicle_id),
    foreign key (employee_no) references driver(employee_no)
);
create table customer(
    reference integer auto_increment primary key,
    company_name varchar(25) not null,
    address varchar(30) not null,
    town varchar(30),
    post_code varchar(10) not null,
    telephone varchar(20) not null,
    contact_fname varchar(25),
    contact_sname varchar(25),
    contact_email varchar(40)
    cam_id integer not null,
    foreign key (cam_id) references employee(employee_no)
);
create table manifest(
    barcode integer auto_increment primary key,
    trip_id integer not null,
    pickup_customer_ref integer not null,
    delivery_customer_ref integer not null,
    category varchar(1) not null,
    weight integer not null,
    cam_id integer not null,
    foreign key (trip_id) references trip(trip_id),
    foreign key (pickup_customer_ref) references customer(reference),
    foreign key (delivery_customer_ref) references customer(reference),
    foreign key (category) references category(category),
    foreign key (cam_id) references employee(employee_no)
);
create table employee(
    employee_no integer auto_increment primary key,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
    ni_no varchar(13),
    telephone varchar(20),
    mobile varchar(20),
    role varchar(6)
);
create table certificates(
    certificate_id integer auto_incrememnt primary key,
    employee_no integer not null,
    achieved varchar(1),
    achievment_date datetime,
    expiry_date datetime,
    foreign key (employee_no) references employee(employee_no)
);
create table query(
    query_id integer auto_increment primary key,
    query_id integer not null,
    response_id integer not null,
    foreign key (query_id) references query(query_id),
    foreign key (response_id) references response(response_id)
);
create table response(
    response_id integer auto_increment primary key,
    date_created datetime,
    query_id integer not null,
    content text,
    cam_id integer not null,
    foreign key (query_id) references query_state(query_id),
    foreign key (cam_id) references employee(employee_no)
);
create table query_state(
    query_state text primary key,
    query_id integer not null,
    response_id integer not null,
    foreign key (query_id) references query(query_id),
    foreign key (response_id) references response(response_id)
);
create table response(
    response_id integer auto_increment primary key,
    date_created datetime,
    query_id integer not null,
    content text,
    cam_id integer not null,
    foreign key (query_id) references query_state(query_id),
    foreign key (cam_id) references employee(employee_no)
);
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

Certificates table:

```sql
insert into certificates (employee_no, certificate_type, achievement_date, expiry_date)
values(
    '001234', -- Employee number
    'Hazerdous Goods', -- Certificate type
    '2012-03-01', -- Date achieved
    '2013-03-01'); -- Valid until
insert into certificates (employee_no, certificate_type, achievement_date, expiry_date)
values(
    '001235',
    'Customer Service',
    '2012-04-11',
    '2013-04-11');
insert into certificates (employee_no, certificate_type, achievement_date, expiry_date)
values(
    '001236',
    'Hazardous Goods',
    '2012-02-21',
    '2013-02-21');
...
```

Customer table:

```sql
insert into customer
values(
    1,
    'Calash Ltd.',  
    '88 Rinkomania Lane',
    'Cardigan',
    'SA55 8BA',
    '01167 1595763',
    'Cameron',
    'Dunnico',
    'c.dunnico@calash.co.uk',
    '001235'); -- Added cam_id
insert into customer
values(
    2,
    'Stichomancy & Co',  
    '17 Suspiration Street',
    'Okehampton',
    'EX48 4CG',
    '01450 2312678',
    'Henry',
    'Petts',
    'h.petts@stichomancy.co.uk',
    '002316'); -- Added cam_id
insert into customer
values(
    3,
    'Trochiline Services',  
    '15 Upcast Street',
    'Carrbridge',
    'PH24 0BF',
    '01222 9556982',
    'Richard',
    'Hanford',
    'r.hanford@trochiline.co.uk',
    '001235'); -- Added cam_id
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
    259979822,
    299,
    'A',
    c1.reference,
    c2.reference,
    '001235' -- Added cam_id
from customer c1, customer c2
where c1.company_name = 'Officialism & Co'
    and c2.company_name = 'Splenium Industrial';

insert into manifest (trip_id,
    barcode,
    weight,
    category,
    pickup_customer_ref,
    delivery_customer_ref)
select 73927,
    722520992,
    2861,
    'A',
    c1.reference,
    c2.reference,
    '001235' -- Added cam_id
from customer c1, customer c2
where c1.company_name = 'Splenium Industrial'
    and c2.company_name = 'Cocket Services';

insert into manifest (trip_id,
    barcode,
    weight,
    category,
    pickup_customer_ref,
    delivery_customer_ref)
select 73927,
    395496225,
    1037,
    'A',
    c1.reference,
    c2.reference,
    '001235' -- Added cam_id
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
WHERE trip_id = <trip_id>;
```

Identify a customer's current cam:

```sql
SELECT employee.employee_number, employee.first_name, employee.last_name
FROM employee
INNER JOIN customer
ON customer.cam_id = employee.employee_no
WHERE customer.reference = <reference>;
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
