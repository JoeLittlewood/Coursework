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

Having many tables can disadvantage MYSQL over NoSQL when it comes to large data sets. A simple query may involve many tables, which takes time and processing power; making relational database structures slower with less performance capability than a non-relational database.

Scalability is also a factor that is worth concidering when it comes to differences between relational and non-relational databases. A database can be scaled in one of two ways with the limitation being the type of database. The two methods of scalability are horizontal and vertical scaling.

Horizontal scaling is when more physical machines are added to the structure to handle the demands of the database. Vertical scaling is when the machine itself is altered, increasing it's processing power.

MYSQL, being a relational database, is limited to just vertical scaling. This is because the database cannot be spread between multiple machines. This of course limits it's scale to the machine's physical power; making a relational database less useable for large data sets or datasets that are predicted to expand substantially.

One point worth mentioning is the security of MYSQL. SQL is a language developed for relational databases. It is used to access, modify and delete data in the database. A website or webpage using MYSQL can be vulnerable to attack in the form of a SQL injection attack (SQLi). An SQL injection attack is when an attacker has the power to paste SQL queries in user input fields on a webpage that directly communicate wih the database. This gives the attacker the ability to run operating system commands.

## NOSQL

NOSQL, commonly confused as not containing the Structured Query Language, stands for "Not Only SQL". It approaches database design in a way that can accomodate most data models. The example that this report will reference is a document-based database structure called MongoDB. One significant difference between a non-relational database like MongoDB and a relational structure is that it relies on 'collections' containing 'documents' of data instead of 'tables'. Documents get stored within collections, elliminating the need for a schema explaining the structure of the database.

### NOSQL Advantages

Having no schema can be both an advantage and disadvantage. For the same reason a schema is an advantage in a MYSQL database, it makes not having one a disadvantage in a NOSQL database. Despite this, the advantage of no schema outweighs the disadvantage. This advantage being that inputting data in a NOSQL database is 

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
