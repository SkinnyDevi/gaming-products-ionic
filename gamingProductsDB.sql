drop database if exists db_gaming_stock;
create database db_gaming_stock;
use db_gaming_stock;

create table stock (
	id int not null auto_increment primary key,
	product_name varchar(40) not null,
	stock int not null,
	price int not null
) engine=InnoDB;

# drop table stock;

# Insert data to databases
insert into stock values(null, "Gaming Headset Stereo", 6, 19.99);
insert into stock values(null, "Keyz Neon by G-Lab", 2, 20);
insert into stock values(null, "Arm-Stand Microphone", 10, 39.99);

select * from stock;