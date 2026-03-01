create database management_system;
use management_system;

-- 1. Tables with NO dependencies
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_name VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(100),
    description MEDIUMTEXT,
    contact VARCHAR(50)
);

-- 2. Tables that depend on the above
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pswd VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    remaining_amount INT DEFAULT 0,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE request(
request_index int primary key auto_increment,
request_id int NOT NULL,
user_id int NOT NULL,
item_id int NOT NULL,
amount_requested int NOT NULL,
request_date datetime NOT NULL,
foreign key	(user_id) references users(user_id),
foreign key (item_id) references items(item_id)
);

-- 3. Tables that depend on items/suppliers
CREATE TABLE shipments (
    shipment_index INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT,
    supplier_id INT,
    gtin INT DEFAULT 0,
    delivery_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    shipment_id INT NOT NULL,
    expiration_date DATE,
    cost INT,
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- 4. Triggers

DELIMITER //
CREATE TRIGGER after_request_insert
AFTER INSERT ON request
FOR EACH ROW
BEGIN
    UPDATE items
    SET remaining_amount = remaining_amount - NEW.amount_requested
    WHERE item_id = NEW.item_id;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_shipment_insert
AFTER INSERT ON shipments -- Fixed table name from 'shipment' to 'shipments'
FOR EACH ROW
BEGIN
    UPDATE items
    SET remaining_amount = remaining_amount + 1
    WHERE item_id = NEW.item_id; -- Added NEW. prefix
END; //

DELIMITER ;