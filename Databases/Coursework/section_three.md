# Section three - youhaul.com (20 points)

> Joe L, 40417692

----

## Introduction

Databases come in many different shapes and sizes. Managing them can come with it's challenges if they get too big. Therefore, creating a database from scratch requirs much thught and planning in order to make it easy to manage, efficient and reliable. There are two options when creating a database. Use a relational structure or a non-relational structure. This report will discuss the advantages and disadvantages of a relational structure as well as a non-relational structure. As an example, MYSQL will be used as the relational database and MongoDB for the non-relational database. The example scenario will be a haulage company called 'YouHaul' who are looking to expand their market globally.

## MYSQL

MYSQL is a relational database. It is called a relational database due to the relationships between it's many tables of data. For example, a customer may have their own table with their contact details in, an employee's information will be in another and the contents of a trip will be in a separate table. All of them will be linked together by a trip table where trip includes it's own Primary key and the foreign keys linking to the employee, custoemr and manifest (contents of a trip) table. The ER diagram for this example can be seen below in figure [1].



All records rely on schema and has to be Normalised.
Multiple tables are used which are related to one another.
Different types of table. 1..1, 1..\*, \*..\*

### MYSQL Advantages

Uses schemas.
Relations. - Frequent updates made easier.
DATA is distributed acorss multiple tables.

### MYSQL Disadvantages

Worse performance than nosql.
Horizontal Scaling. - Add more servers. Not supported for SQL db's.
Limitiations with lots of read and write queries per second.

## NOSQL

Collections instead of tables.
Documents are stored in collections. - Don't have to use same schema.
No/Few relations.

### NOSQL Advantages

No schema.
No relations.
Can be scaled in both directions.

### NOSQL Disadvantages

No relations - duplicate data.
Great performance for more simple read & write requests.

## My solution

## Conclusion
