# MBANKING APPS

This is my 9th assignment. so now i make some database for a simple database you can check on this link
[Assignment W9](https://week-9-hill-man-1-production.up.railway.app/) ah i will show you how to create a database, create table, input value

and i just make some CRUD database how to post, get the data, update the data and delete the data. so here is the link

## GET TRANSACTIONS BY USER ID

[Get User By Id](https://week-9-hill-man-1-production.up.railway.app/users/1)

## GET ALL TRANSACTIONS

[Get All Transactions](https://week-9-hill-man-1-production.up.railway.app/transactions)

## GET TRANSACTIONS BY TYPE

[Get Transactions By Type](https://week-9-hill-man-1-production.up.railway.app/transactions/type/:type)

all you have to do is read the contoller and you will see how to edit, update dan delete data

# CREATE THE DATABASE

## INISTALL DEPENDENCIES
so first of all we just need to open your CLI and install some dependencies. and this is is my dependencies.

![depdencies](/screenshot/install%20dependecies.png).


## INSTALL MYSQL SERVER AND DBEAVER

and now we have to install mysql server and DBeaver. 

MySQL is an open-source relational database management system (RDBMS) that serves as a robust and efficient platform for managing, storing, and retrieving data. It offers various functions and capabilities that enable users to create, manipulate, and query databases. Some of the key functions of MySQL.

DBeaver is our SQL Editor and it's popular and powerful open-source universal database tool that provides a wide range of functions for database management, development, and administration. It supports various database systems and offers a unified interface to interact with different types of databases.

## OPEN TERMINAL AND MAKE SOME DATABASE

Before you make some database you have to Sign In as a root with this command: **mysql -u root -p** and you have to put your password if you don't have a password just press enter.

![root sql](/screenshot/1.%20root_sql.png)


## CREATE DATABASE

after you Sign In as a root you can create database using this command **create database (put some name for your database);** and press enter. if CLI say ok you can see your table using this command **show databases**. like this

![create database](/screenshot/2%20.create%20database.png)

![show database](/screenshot/3.%20show%20database.png)

## OPEN DBEAVER

and now you have too connect to you database using DBeaver. you just have to click on the top **Database** and choose **MySQL** click next and you have to put some information about your database name and your root password. after that you can click test connection. you can see the picture below

![choose mysql](/screenshot/choose%20mysql.png)

![test connection](/screenshot/test%20connection.png)

![successfully connected](/screenshot/commect%20database.png)


## CREATE SOME TABLES, COLUMN AND PUT THE VALUE

and now you can create a new tables using this command 
```sql
CREATE TABLE table_name (
    column1 datatype [optional_constraints],
    column2 datatype [optional_constraints],
    ...
    columnN datatype [optional_constraints]
);
```
![create table](/screenshot/5.%20create%20table.png)

and then you can put value into it using this command. and you can see the value on the table you created

```sql
INSERT INTO table_name (column1, column2, ..., columnN)
VALUES (value1, value2, ..., valueN);
```

![insert into](/screenshot/6.%20add%20example%20user%20and%20desc%20table.png)

and you can open your CLI and Sign In into mysql again so you can using SQL Shell and write this command

```shell
use (your database name)
```

use database mean you use the database for your project. and you can see the description about your table you created. You will see what columns can be filled in later

```shell
desc (your table name)
```

![use and desc some table](/screenshot/show%20column%20on%20terimal%20and%20use%20database.png)

## FEW SYNTAX I USED ON THIS PROJECT ASSIGNMENT

1. create a new table

```sql
create table users (
	id int primary key not null auto_increment,
	name varchar(100) not null,
	address text not null
)
```

```sql
create table transactions (
	id int primary key not null auto_increment,
	user_id int not null,
	type enum('income','expense'),
	amount double,
	foreign key (user_id) references users(id)
)
```
2. input some value to the table

```sql
insert into railway.users (name, address)
values ('Fadilah','Bandung')
```

```sql
insert into railway.transactions (user_id , type, amount)
values ('2','income','200000')
```

3. find balance using income - expense
   
```sql
SELECT
    u.id,
    u.name,
    u.address,
    COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0) -
    COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) AS balance,
    COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) AS expense
FROM
    users u
JOIN
    transactions t ON u.id = t.user_id
GROUP BY
    u.id, u.name, u.address;
```

## CONNECT TO API

after all good you can connect to your API just create some node file using port you want to use and it will show like this

![connect local](/screenshot/connect%20local.png)

but for this assignment i have to connect it to railway so anyone can check it. i just put link on the top

![connect railways](/screenshot/connect%20to%20railway.png)

