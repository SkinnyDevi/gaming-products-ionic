drop database if exists db_gaming_stock;
create database db_gaming_stock;
use db_gaming_stock;

create table stock (
	id int not null auto_increment primary key,
	product_name varchar(40) not null,
    product_desc text null,
    img_url varchar(2038) not null,
	stock int not null,
	price int not null
) engine=InnoDB;

# drop table stock;

# Insert data to databases
insert into stock values(null, "Gaming Headset Stereo", "Gaming headset with full range frequency", "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_86614299/fee_325_225_png",6, 19.99);
insert into stock values(null, "Keyz Neon by G-Lab", "Semi-mechanincal RGB keyboard", "https://www.worten.es/i/ac8f22321eae602b6e8dde3ca5cf1427c3e8ba38.jpg", 2, 20);
insert into stock values(null, "Arm-Stand Microphone", "360 Arm-Stand for any microphone", "https://m.media-amazon.com/images/I/61gde2GtMKL._AC_SL1280_.jpg",10, 39.99);
insert into stock values(null, "Gaming Headset Stereo", "Gaming headset with full range frequency", "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_86614299/fee_325_225_png",6, 19.99);
insert into stock values(null, "Keyz Neon by G-Lab", "Semi-mechanincal RGB keyboard", "https://www.worten.es/i/ac8f22321eae602b6e8dde3ca5cf1427c3e8ba38.jpg", 2, 20);
insert into stock values(null, "Arm-Stand Microphone", "360 Arm-Stand for any microphone", "https://m.media-amazon.com/images/I/61gde2GtMKL._AC_SL1280_.jpg",10, 39.99);
insert into stock values(null, "Gaming Headset Stereo", "Gaming headset with full range frequency", "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_86614299/fee_325_225_png",6, 19.99);
insert into stock values(null, "Keyz Neon by G-Lab", "Semi-mechanincal RGB keyboard", "https://www.worten.es/i/ac8f22321eae602b6e8dde3ca5cf1427c3e8ba38.jpg", 2, 20);
insert into stock values(null, "Arm-Stand Microphone", "360 Arm-Stand for any microphone", "https://m.media-amazon.com/images/I/61gde2GtMKL._AC_SL1280_.jpg",10, 39.99);

select * from stock;