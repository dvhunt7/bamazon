DROP DATABASE IF EXISTS bamazondb;
create database bamazondb;
use bamazondb;

create table products(
	id integer auto_increment not null,
    product_name varchar(1024),
	department_name varchar(1024),
    price int (100),
    stock_quantity int (100),
    primary key (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) values ('Furbacca', 'toys', 80, 47);
INSERT INTO products(product_name, department_name, price, stock_quantity) values ('Life Size Predator Statue', 'furniture', 1000, 22);
INSERT INTO products(product_name, department_name, price, stock_quantity) values ('Godzilla Monopoly', 'games', 15, 4000);
INSERT INTO products(product_name, department_name, price, stock_quantity) values ('Gibson Les Paul', 'Guitars', 1500, 35);
INSERT INTO products(product_name, department_name, price, stock_quantity) values ('The Savage Sword of Conan!', 'books', 10, 3000);
INSERT INTO products(product_name, department_name, price, stock_quantity) values ('HP Lovecrafts Greatest Hits', 'books', 13, 3500);
