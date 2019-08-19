# Section two - Database Design (20 points)

> Joe L, 40417692

----

## Extending the ER diagram to accomodate Customer Account Managers (CAM's)

![ER Diagram for section two](haulage_drawio.png)

In order to introduce a customer account manager, I had to remove the driver table as they are no-longer the only employees. I replaced the driver table with an employee table and introduced an attreibute of 'role' that will describe the role of that employee, whether they are a driver or a CAM. One unique attribute that belonged to the driver table was whether they could carry hazardous goods or not. In order to satisfy this requirment, I introduced a certificates table where this certificate, along with any additional certificates that may be acquired in the future, can be stored. So that a customer's CAM can be identified at any time, I placed a cam_id attribute in the customer table which is a direct reference to an employee number. This can also be seen in the manifest table so that any CAM can be identified as being responsible for any trip.

I have made it so that one customer has to have a CAM at all times but a CAM can manage many customers at one time. Similarly, a CAM can be responsible for many manifest items.

## Alter the database to inlcude any additional tables and attributes

```SQL
-- Adds cam_id to table.
ALTER TABLE customer
ADD cam_id INTEGER NOT NULL
AFTER contact_email;

-- Creates employee table.
CREATE TABLE employee(
    employee_no INTEGER auto_increment PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    ni_no VARCHAR(13),
    telephone VARCHAR(20),
    mobile VARCHAR(20),
    role VARCHAR(6)
);

-- Makes cam_id a foreign key.
ALTER TABLE customer
ADD FOREIGN KEY (cam_id)
REFERENCES employee(employee_no);

-- Adds cam_id to manifest table.
ALTER TABLE manifest
ADD cam_id INTEGER NOT NULL
AFTER weight;

-- Makes cam_id a foreign key.
ALTER TABLE manifest
ADD FOREIGN KEY (cam_id)
REFERENCES employee(employee_no);

-- Creates certificates table.
CREATE TABLE certificates(
    certificate_id INTEGER auto_increment PRIMARY KEY,
    employee_no INTEGER NOT NULL,
    certificate_type VARCHAR(20),
    achievement_date DATE,
    expiry_date DATE
);

-- Makes employee_no foreign key.
ALTER TABLE certificates
ADD FOREIGN KEY (employee_no)
REFERENCES employee(employee_no);

-- Removes the current foreign key.
ALTER TABLE trip
DROP FOREIGN KEY trip_ibfk_2;

-- Changes the type for employee to INTEGER.
CHANGE employee_no employee_no INTEGER;

-- Removes the driver table.
DROP TABLE driver;
```

### Customer Queries

```sql
-- Creates query table.
CREATE TABLE query(
    query_id INTEGER auto_increment PRIMARY KEY,
    date_created DATE NOT NULL,
    customer_ref INTEGER NOT NULL,
    content TEXT NOT NULL
);

-- Creates response table.
CREATE TABLE response(
    response_id INTEGER auto_increment PRIMARY KEY,
    date_created DATE,
    query_id INTEGER NOT NULL,
    content TEXT,
    cam_id INTEGER NOT NULL
);

-- Makes response_id foreign key.
ALTER TABLE query
ADD FOREIGN KEY (customer_ref)
REFERENCES customer(reference);

-- Makes query_id and cam_id foreign key.
ALTER TABLE response
ADD FOREIGN KEY (query_id)
REFERENCES query(query_id),
ADD FOREIGN KEY (cam_id)
REFERENCES employee(employee_no);

-- Creates query_state table.
CREATE TABLE query_state(
    query_id INTEGER NOT NULL,
    response_id INTEGER NOT NULL,
    query_state TEXT
);

-- Makes foreign keys.
ALTER TABLE query_state
ADD FOREIGN KEY (query_id)
REFERENCES query(query_id),
ADD FOREIGN KEY (response_id)
REFERENCES response(response_id);
...
```

----

## Insert sample data for at least three customers and their cam's

Employee table:

```sql
INSERT INTO employee (first_name, last_name, ni_no, telephone, mobile, role)
VALUES(
    'Carlos',
    'Coronel',
    'AA 12 34 56 B',
    '0165 6727840',
    '07659 9770175',
    'driver'); -- Added role
INSERT INTO employee (first_name, last_name, ni_no, telephone, mobile, role)
VALUES(  
    'Vicky',
    'Feilding',
    'BB 12 34 56 C',
    '0165 6727840',
    '07659 9770175',
    'cam'); -- Added role
INSERT INTO employee (first_name, last_name, ni_no, telephone, mobile, role)
VALUES(
    'Alissa',
    'McWhinnie',
    'CC 12 34 56 D',
    '0165 6727840',
    '07659 9770175',
    'driver'); -- Added role
...
```

> After pasting this command, I realised I had input the telephone number in an incorrect format; so I used the following command to make this right:

```sql
UPDATE employee SET telephone = '01656 727840' WHERE employee_no = 1 OR 2 OR 3;
```

Cerificates table:

```sql
INSERT INTO certificates (employee_no, certificate_type, achievement_date, expiry_date)
VALUES(
    '1',
    'Hazerdous Goods',
    '2012-03-01',
    '2013-03-01');
INSERT INTO certificates (employee_no, certificate_type, achievement_date, expiry_date)
VALUES(
    '2',
    'Customer Service',
    '2012-04-11',
    '2013-04-11');
INSERT INTO certificates (employee_no, certificate_type, achievement_date, expiry_date)
VALUES(
    '3',
    'Hazardous Goods',
    '2012-02-21',
    '2013-02-21');
...
```

Customer table:

```sql
INSERT INTO customer (company_name,
    address,
    town,
    post_code,
    telephone,
    contact_fname,
    contact_sname,
    contact_email,
    cam_id)
VALUES(
    'Calash Ltd.',  
    '88 Rinkomania Lane',
    'Cardigan',
    'SA55 8BA',
    '01167 1595763',
    'Cameron',
    'Dunnico',
    'c.dunnico@calash.co.uk',
    '2');

INSERT INTO customer (company_name,
    address,
    town,
    post_code,
    telephone,
    contact_fname,
    contact_sname,
    contact_email,
    cam_id)
VALUES(
    'Stichomancy & Co',  
    '17 Suspiration Street',
    'Okehampton',
    'EX48 4CG',
    '01450 2312678',
    'Henry',
    'Petts',
    'h.petts@stichomancy.co.uk',
    '2');

INSERT INTO customer (company_name,
    address,
    town,
    post_code,
    telephone,
    contact_fname,
    contact_sname,
    contact_email,
    cam_id)
VALUES(
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
INSERT INTO manifest (trip_id,
    barcode,
    weight,
    category,
    pickup_customer_ref,
    delivery_customer_ref,
    cam_id)
SELECT 73927,
    259979829,
    299,
    'A',
    c1.reference,
    c2.reference,
    '2'
FROM customer c1, customer c2
WHERE c1.company_name = 'Officialism & Co'
    AND c2.company_name = 'Splenium Industrial';

INSERT INTO manifest (trip_id,
    barcode,
    weight,
    category,
    pickup_customer_ref,
    delivery_customer_ref,
    cam_id)
SELECT 73928,
    722529999,
    2861,
    'A',
    c1.reference,
    c2.reference,
    '2'
FROM customer c1, customer c2
WHERE c1.company_name = 'Splenium Industrial'
    AND c2.company_name = 'Cocket Services';

INSERT INTO manifest (trip_id,
    barcode,
    weight,
    category,
    pickup_customer_ref,
    delivery_customer_ref,
    cam_id)
SELECT 73929,
    395486229,
    1037,
    'A',
    c1.reference,
    c2.reference,
    '2'
FROM customer c1, customer c2
WHERE c1.company_name = 'Splenium Industrial'
    AND c2.company_name = 'Eulogomania Group';
...
```

Query table:

```sql
INSERT INTO query (date_created, customer_ref, content)
VALUES(
    '2012-04-01',
    301,
    'Im not very happy with the service because the delivery was late!');
INSERT INTO query (date_created, customer_ref, content)
VALUES(
    '2012-05-21',
    302,
    'Thank-you so much for this order.');
INSERT INTO query (date_created, customer_ref, content)
VALUES(
    '2012-07-25',
    303,
    'Can I order more of these please?');
```

Response table:

```sql
INSERT INTO response(
    date_created,
    query_id,
    content,
    cam_id)
VALUES (
    '2012-04-07',
    2,
    'Im sorry to hear that, this wont happen again.
    Your next order will be discounted with 20% off as an appology.',
    2
);

INSERT INTO response(
    date_created,
    query_id,
    content,
    cam_id)
VALUES (
    '2012-05-26',
    3,
    'Im glad you are happy with your order.',
    2
);

INSERT INTO response(
    date_created,
    query_id,
    content,
    cam_id)
VALUES (
    '2012-05-26',
    4,
    'Ill look into that for you',
    2
);
```

Query_state table:

```sql
INSERT INTO query_state
VALUES (
    2,
    1,
    'Completed'
);

INSERT INTO query_state
VALUES (
    3,
    2,
    'Completed'
);

INSERT INTO query_state
VALUES (
    4,
    3,
    'Pending'
);
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
SELECT customer.company_name, CONCAT(employee.first_name, ' ', employee.last_name) 
AS 'Managed By'
FROM employee
INNER JOIN customer
ON customer.cam_id = employee.employee_no
WHERE customer.reference = 301;
```

Output:

```sh
+--------------+----------------+
| company_name | Managed By     |
+--------------+----------------+
| Calash Ltd.  | Vicky Feilding |
+--------------+----------------+
```
