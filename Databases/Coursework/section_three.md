# Section three - youhaul.com (20 points)

> Joe L, 40417692
<div style=text-align:justify;>

----

## Introduction

Databases come in many different shapes and sizes. Managing them can come with it's challenges if they get too big. Therefore, creating a database from scratch requirs much thught and planning in order to make it easy to manage, efficient and reliable. There are two options when creating a database. Use a relational structure or a non-relational structure. This report will discuss the advantages and disadvantages of a relational structure as well as a non-relational structure. As an example, MYSQL will be used as the relational database and MongoDB for the non-relational database. The example scenario will be a haulage company called 'YouHaul' who are looking to expand their market globally.


## MYSQL

MYSQL is a relational database. It is called a relational database due to the relationships between it's many tables of data. For example, a customer may have their own table with their contact details in, an employee's information will be in another and the contents of a trip will be in a separate table. The Employee and Customer tables are linked together by a Manifest table and a Trip table. The ER diagram for this example can be seen below in _figure[1]_.

<center>

![Figure 1 - ER Diagram](figure1.png)

> _Figure[1] - ER diagram representing small part of Haulage database_

</center>

As seen in _figure[1]_, each table has at least one relation with anoher. They are linked together with the use of Primary and Foreign keys. A Primary Key that all attribues depend upon in a table will be referenced by a Foreign key in another. Employee_no in the employee table will be referenced to by driver_id in the trip table, for example. For this reason, relational databases have to abide by a certain set of rules and layout, otherwise known as a schema. The database will also have to be normalised. This means that the databse will follow these rules and be easy to interpret.

### MYSQL Advantages

Relational databses such as MYSQL benefit from this strict use of schemas and normalisation because it standardises the syntax and layout of the database; making it more usable and easy to maintain. The schema can easily be looked through along with an Entity Relationship diagram making the relations easily distinguished.

In a relational database there is ideally no repeated data. So if an employee changed their phone number it would not have to be changed in multiple places, only one. This makes making small changes like this one a lot more efficient and easy to manage.

### MYSQL Disadvantages

Having many tables can disadvantage MYSQL over NoSQL when it comes to large data sets, however. A simple query may involve many tables, which takes time and processing power; making relational dtabase structures slower with less performance capability than a non-relational database.

Worse performance than nosql.
Horizontal Scaling. - Add more servers. Not supported for SQL db's.
Limitiations with lots of read and write queries per second.
SQL injection.

## NOSQL

Collections instead of tables.
Documents are stored in collections. - Don't have to use same schema.
No relations - MongoDB

### NOSQL Advantages

No schema.
No relations.
Can be scaled horizontally directions.
Data redundancy.

### NOSQL Disadvantages

No relations - duplicate data - Garbage collector is needed.
Great performance for more simple read & write requests.
Not as big of a community/ query syntax.

## My solution

## Conclusion
