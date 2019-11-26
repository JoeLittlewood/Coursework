# Section three - youhaul.com (20 points)

> Joe L, 40417692
<div style=text-align:justify;>

----

Databases come in many different shapes and sizes. Managing them can come with its challenges if they get too big. Therefore, creating a database from scratch requires much thought and planning to make it easy to manage, efficient and reliable. There are two options when creating a database. Use a relational structure or a non-relational structure. This report will discuss the advantages and disadvantages of a relational structure as well as a non-relational structure. As an example, MYSQL will be used as the relational database and MongoDB for the non-relational database. The example scenario will be a haulage company called 'YouHaul' who are looking to expand their market globally.

MYSQL is a relational database. It is called a relational database due to the relationships between its many tables of data. For example, a customer may have their table with their contact details in, an employee's information will be in another and the contents of a trip will be in a separate table. The Employee and Customer tables are linked together by a Manifest table and a Trip table. The ER diagram for this example can be seen below in _figure[1]_.
As seen in _figure[1]_, each table has at least one relation with another. They are linked together with the use of Primary and Foreign keys. A Primary Key that all attributes depend upon in a table will be referenced by a Foreign key in another. For this reason, relational databases have to abide by a certain set of rules and layout, otherwise known as a schema. The database will also have to be normalized. This means that the database will follow these rules and be easy to interpret.

<center>

![Figure 1 - ER Diagram](figure1.png)

> _Figure[1] - ER diagram representing small part of Haulage database_

</center>

Relational databases, such as MYSQL, benefit from this strict use of schemas and normalization because it standardizes the syntax and layout of the database; making it more usable and easy to maintain. The schema can easily be looked through along with an Entity Relationship diagram making the relations easily distinguished.
In a relational database, there is ideally no repeated data. So if an employee changed their phone number it would not have to be changed in multiple places, but only one.

Having many tables can disadvantage MYSQL over NoSQL when it comes to large data sets. A simple query may involve many tables, which takes time and processing power.
A database can be scaled in one of two ways with the limitation being the type of database. The two methods of scalability are horizontal and vertical scaling.
Horizontal scaling is when more physical machines are added to the structure. Vertical scaling is when the machine itself is altered, increasing it's processing power.
MYSQL is limited to just vertical scaling. This is because the database cannot be spread between multiple machines. This limits it's scale to the machine's physical power; making a relational database less useable for large data sets.
SQL is a language developed for relational databases. It is used to access, modify and delete data in the database. A website or webpage using MYSQL can be vulnerable to attack in the form of a SQL injection attack (SQLi). An SQL injection attack is when an attacker has the power to paste SQL queries in user input fields on a webpage that directly communicates with the database. This gives the attacker the ability to run operating system commands.

NoSQL, commonly confused as not containing SQL, stands for "Not Only SQL". It approaches database design in a way that can accommodate most data models. The example that this report will reference is a document-based database structure called MongoDB. One significant difference between a non-relational database like MongoDB and a relational structure is that it relies on 'collections' containing 'documents' of data instead of 'tables'. Documents get stored within collections, eliminating the need for a schema explaining the structure of the database.

Having no schema can be both an advantage and a disadvantage. For the same reason a schema is an advantage in a MYSQL database, it makes the lack of one a disadvantage in a NoSQL database. Despite this, the advantage of no schema outweighs the disadvantage. This advantage is that inputting data in a NoSQL database is simpler and more efficient for the Database Administrator.
NoSQL databases also do not need relations between their documents to run. This allows the data to be spread between multiple servers allowing for horizontal scaling. This means that more machines can be added to account for the demand on the database. Queries ran on a non-relational database can access data quickly and more efficiently than a relational database because all the information needed will be found in one collection.

NoSQL duplicates data across the database. This means that a garbage collector is required to clean up this data that is no longer in use.
NoSQL has many different variations; meaning many forms of query syntax exist when comparing versions. This means that it can be hard to learn the syntax as each version does not have as big of a community than SQL. So for some companies more training will have to be implemented in order to educate staff on how to manage this new type of database.

YouHaul.com is a haulage company who are considering expanding their business globally. This means that when fully operational thousands of contractors will be using the online service to manage their scheduling. For this purpose alone a NoSQL solution seems more beneficial for the company. This is due to NoSQL's scalability and durability when handling large quantities of queries. This scalability will benefit the company in the future too. They plan to have at least one million contractors on the system when this updated infrastructure is introduced so not only will a NoSQL solution help to support this large quantity right from the beginning but it can also be horizontally expanded in the future, accommodating for the natural growth of the company.

To implement this data into a NoSQL database I would start with having a user or employee document that contains their contact information, employee number, and information about what their job is. For example, if they were a driver then the vehicles they drive can be pasted in this document. This document can then be identified by a unique ID. I would then create a customer document that would keep track of the customer information. A trip tale would then link the driver and customer, together with a list of all the items on that trip being delivered. This allows information to be added to the database quickly and efficiently and filtered just as fast.

In conclusion, both SQL and NoSQL have their strengths and weaknesses. It depends solely on the requirements and structure of the data needing to be stored to decide upon which solution to use. SQL is efficient and has a greater presence within the community making it easy to use and useful for small data sets. NoSQL, on the other hand, has its uses with large data sets and provides a more long-term solution for medium-sized companies.
