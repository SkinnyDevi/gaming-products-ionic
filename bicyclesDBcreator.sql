drop database if exists db_bicycles;
create database db_bicycles;
use db_bicycles;

create table bicycles (
	id int not null auto_increment primary key,
    model varchar(40) not null,
	creation_year int not null
) engine=InnoDB;

# drop table bicycles;

# Insert data to databases
insert into bicycles (model, creation_year) values ("Orbea", 1996);
insert into bicycles (model, creation_year) values ("Decathlon", 2003);
insert into bicycles (model, creation_year) values ("Canondale", 2009);

select * from bicycles;