# MariaDB installation

## Install from repository

```sh
sudo apt-get update
sudo apt-get install mariadb-server
```

## Verify MariaDB is operational

```sh
sudo mysql -u root -p
service mysql start
```

## Import DB

Create new database:

```sql
CREATE DATABASE haulage;
```

## Import dump file

```sql
mysql -u username -p new_databse < data-dump.sql
```

**username:** root
**new_database:** haulage
**data-dump.sql:** haulage.sql

---

## Important SQL commands

To login (from unix shell) use -h only if needed.
`# [mysql dir]/bin/mysql -h hostname -u username -p password`
To login (from windows)
`mysql dir/bin/mysql.exe -h hostname -u username -p password`

Create a database.
`mysql> create database [databasename];`

List all databases on the server.
`mysql> show databases;`

Switch to a database.
`mysql> use [db name];`

To see all the tables in the db.
`mysql> show tables;`

To see table's field formats.
`mysql> describe [table name];`

To delete a db.
`mysql> drop database [database name];`

To delete a table.
`mysql> drop table [table name];`

Show all data from a table.
`mysql> SELECT * FROM [table name];`

To return columns and column information.
`mysql> show columns from [table name];`

Show particular rows with the given value.
`mysql> SELECT * FROM [table name] WHERE [field name] = "value";`

Show all records containing the name "Something" AND the phone number '0123456789'.
`mysql> SELECT * FROM [table name] WHERE name = "Something" AND phone_number = '0123456789';`

Show all records not containing the name "Something" AND the phone number '0123456789' order by the phone_number field.
`mysql> SELECT * FROM [table name] WHERE name != "Something" AND phone_number = '0123456789' order by phone_number;`

Show all records starting with the letters 'Something' AND the phone number '0123456789'.
`mysql> SELECT * FROM [table name] WHERE name like "Something%" AND phone_number = '0123456789';`

Show all records starting with letters 'Something' AND the phone number '0123456789' limit to records 1 through 5.
`mysql> SELECT * FROM [table name] WHERE name like "Something%" AND phone_number = '0123456789' limit 1,5;`

Use a regular expression to find records. Use "REGEXP BINARY" to force case-sensitivity. This finds any record beginning with a.
`mysql> SELECT * FROM [table name] WHERE rec RLIKE "^a";`

Show unique records.
`mysql> SELECT DISTINCT [column name] FROM [table name];`

Show selected records sorted in an ascending (asc) or descending (desc).
`mysql> SELECT [col1],[col2] FROM [table name] ORDER BY [col2] DESC;`

Return number of rows.
`mysql> SELECT COUNT(*) FROM [table name];`

Sum column.
`mysql> SELECT SUM(*) FROM [table name];`

Creating a new user. Login as root. Switch to the MySQL db. Make the user. Update privs.
`# mysql -u root -p`

```sql
mysql> use mysql;
mysql> INSERT INTO user (Host,User,Password) VALUES('%','username',PASSWORD('password'));
mysql> flush privileges;
```

Change a users password from unix shell.
`# [mysql dir]/bin/mysqladmin -u username -h hostname -ppassword 'new-password'`

Change a users password from MySQL prompt. Login as root. Set the password. Update privileges.
`# mysql -u root -p`

```sql
mysql> SET PASSWORD FOR 'user'@'hostname' = PASSWORD('password');
mysql> flush privileges;
```

Recover a MySQL root password. Stop the MySQL server process. Start again with no grant tables. Login to MySQL as root. Set new password. Exit MySQL and restart MySQL server.
`# /etc/init.d/mysql stop`
`# mysqld_safe --skip-grant-tables`
`# mysql -u root`

```sql
mysql> use mysql;
mysql> update user set password=PASSWORD("newpassword") where User='root';
mysql> flush privileges;
mysql> quit
```

`# /etc/init.d/mysql stop`
`# /etc/init.d/mysql start`

Set a root password if there is no root password.
`# mysqladmin -u root password newpassword`

Update a root password.
`# mysqladmin -u root -p oldpassword newpassword`

Allow the user "Someone" to connect to the server from localhost using the password "passwd". Login as root. Switch to the MySQL db. Give privs. Update privs.
`# mysql -u root -p`

```sql
mysql> use mysql;
mysql> grant usage on *.* to Someone@localhost identified by 'passwd';
mysql> flush privileges;
```

Give user privilages for a db. Login as root. Switch to the MySQL db. Grant privs. Update privs.
`# mysql -u root -p`

```sql
mysql> use mysql;
mysql>INSERT INTO user(Host,Db,User,Select_priv,Insert_priv,Update_priv,Delete_priv,Create_priv,Drop_priv)
 VALUES ('%','databasename','username','Y','Y','Y','Y','Y','N');
mysql> flush privileges;
```

or

`mysql> grant all privileges on databasename.* to username@localhost;`
`mysql> flush privileges;`

To update info already in a table.
`mysql> UPDATE [table name] SET Select_priv = 'Y',Insert_priv = 'Y',Update_priv = 'Y' where [field name] = 'user';`

Delete a row(s) from a table.
`mysql> DELETE from [table name] where [field name] = 'fieldvalue';`

Update database permissions/privilages.
`mysql> flush privileges;`

Delete a column.
`mysql> alter table [table name] drop column [column name];`

Add a new column to db.
`mysql> alter table [table name] add column [new column name] varchar (20);`

Change column name.
`mysql> alter table [table name] change [old column name] [new column name] varchar (50);`

Make a unique column so you get no dupes.
`mysql> alter table [table name] add unique ([column name]);`

Make a column bigger.
`mysql> alter table [table name] modify [column name] VARCHAR(3);`

Delete unique from table.
`mysql> alter table [table name] drop index [colmn name];`

Load a CSV file into a table.
`mysql> LOAD DATA INFILE '/tmp/filename.csv' replace INTO TABLE [table name] FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (field1,field2,field3);`

Dump all databases for backup. Backup file is sql commands to recreate all db's.
`# mysqldump -u username -ppassword --opt > /tmp/alldatabases.sql`

Dump one database for backup.
`# mysqldump -u username -ppassword --databases databasename > /tmp/databasename.sql`

Dump a table from a database.
`# mysqldump -u username -ppassword databasename tablename > /tmp/databasename.tablename.sql`

Restore database (or database table) from backup.
`# mysql -u username -ppassword databasename < /tmp/databasename.sql`

Create Table Example 1.
`mysql> CREATE TABLE [table name] (name VARCHAR(20));`

Create Table Example 2.
`mysql> create table [table name] (personid int(50) not null auto_increment primary key,firstname varchar(35),middlename varchar(50),lastnamevarchar(50) default 'somethiing');`
