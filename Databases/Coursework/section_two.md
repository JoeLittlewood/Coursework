# Section two - Database Design (20 points)

> Joe L, 40417692

----

## Extending the ER diagram to accomodate Customer Account Managers (CAM's)

![ER Diagram for section two](haulage_section_two.png)

In order to introduce a customer account manager, I had to introduce an employee table that was referenced to by both the driver table and the new cam (customer account manager) table.
This new employee table contained the attributes that described that employee. The driver and custoemr account tables simply linked the employee number (employee_no) to either the **cam_no** or **driver_no**.

## Alter the database to inlcude any additional tables and attributes

```SQL
drop table if exists manifest;
drop table if exists customer;
drop table if exists trip;
drop table if exists driver;
drop table if exists vehicle;
drop table if exists model;
drop table if exists category;
drop table if exists employee; -- Added employee table
drop table if exists cam; -- Added customer account manager table

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
create table driver(
    driver_no integer not null primary key, -- Added driver no and made it the primary key
    employee_no integer not null,
    hazardous_goods varchar(1) not null,
    foreign key (employee_no) references employee(employee_no)
    -- Removed all other attributes and pasted them into employee table
);
create table trip(
    trip_id integer auto_increment primary key,
    departure_date datetime,
    return_date datetime,
    vehicle_id integer,
    cam_no integer,
    driver_no integer,
    foreign key (vehicle_id) references vehicle(vehicle_id),
    foreign key (cam_no) references cam(cam_no), -- Added foreign key to cam table
    foreign key (driver_no) references driver(driver_no) -- Added foreign key to driver table
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
    contact_email varchar(40),
    cam_no interger, -- Added froeign key to cam table
    foreign key (cam_no) references cam(cam_no)
);
create table manifest(
    barcode integer auto_increment primary key,
    trip_id integer not null,
    pickup_customer_ref integer not null,
    delivery_customer_ref integer not null,
    category varchar(1) not null,
    weight integer not null,
    foreign key (trip_id) references trip(trip_id),
    foreign key (pickup_customer_ref) references customer(reference),
    foreign key (delivery_customer_ref) references customer(reference),
    foreign key (category) references category(category)
);
create table employee( -- Created employee table
    employee_no integer auto_increment primary key,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
    ni_no varchar(13),
    telephone varchar(20),
    mobile varchar(20),
);
create table cam( -- Create CAM table for Customer Account Managers
    cam_no integer auto_increment primary key,
    employee_no integer,
    foreign key (employee_no) references employee(employee_no)
);
```

----

## Insert sample data for at least three customers and their cam's

Driver table:

```sql
insert into driver values('0045619','1045619','Y')
insert into driver values('0117094','1117094','N')
insert into driver values('0049743','1049743','N')
...
```

Trip table:

```sql
insert into trip
select 72941, STR_TO_DATE('02-Jan-12','%d-%b-%Y'),
    STR_TO_DATE('04-Jan-12','%d-%b-%Y'),
    v.vehicle_id,
    d.employee_no,
    d.driver_no -- Added driver_no
from vehicle v, driver d
where d.first_name = 'Morgan'
    and d.last_name = 'Bohills'
    and v.registration = 'BD08AOG';

insert into trip
select 72942, STR_TO_DATE('02-Jan-12','%d-%b-%Y'),
    STR_TO_DATE('06-Jan-12','%d-%b-%Y'),  
    v.vehicle_id,
    d.employee_no,
    d.driver_no -- Added driver_no
from vehicle v, driver d
where d.first_name = 'Desdemona'
    and d.last_name = 'Dublin'
    and v.registration = 'BD60BVF';

insert into trip
select 72943, STR_TO_DATE('02-Jan-12','%d-%b-%Y'),
    STR_TO_DATE('06-Jan-12','%d-%b-%Y'),  
    v.vehicle_id,
    d.employee_no,
    d.driver_no -- Added driver_no
from vehicle v, driver d
where d.first_name = 'Igor'
    and d.last_name = 'Woodruffe'
    and v.registration = 'BR58BXE';
...
```

Customer table:

```sql
insert into customer
    values(2,
        'Stichomancy & Co',  
        '17 Suspiration Street',
        'Okehampton', 'EX48 4CG',
        '01450 2312678',
        'Henry',
        'Petts',
        'h.petts@stichomancy.co.uk',
        '10000'); -- Added cam_no

insert into customer
    values(3,
        'Trochiline Services',  
        '15 Upcast Street',
        'Carrbridge',
        'PH24 0BF',
        '01222 9556982',
        'Richard',
        'Hanford',
        'r.hanford@trochiline.co.uk',
        '10001'); -- Added cam_no

insert into customer
    values(4,
        'Evaginate Inc.',  
        '9 Miniaceous Mount',
        'Longfield',
        'DA20 1DE',
        '01231 7692992',
        'Edmund',
        'Janson',
        'e.janson@evaginate.co.uk',
        '10002'); -- Added cam_no
...
```

Employee table:

```sql
insert into employee
    values(

    )
...
```
