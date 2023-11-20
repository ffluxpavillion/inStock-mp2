-- dbSchema file to assist with DB creation.

-- To run this file, navigate to the directory in bash, and use this command:

--      mysql -u [your_username] -p < dbSchema.sql

--              replace [your_username] with your MySQL username
--              you will be prompted to enter your MySQL db password



-- ------------------------------


-- `create new database, comment this out if table already exists
CREATE DATABASE inStockMP2;

-- ------------------------------------------------------------------------------------


USE inStockMP2;

DROP TABLE IF EXISTS `warehouses`;

DROP TABLE IF EXISTS `inventories`;

-- CREATE TABLE
--     warehouses (
--         id INT AUTO_INCREMENT PRIMARY KEY,
--         warehouse_name VARCHAR(255) NOT NULL,
--         address VARCHAR(255) NOT NULL,
--         city VARCHAR(255) NOT NULL,
--         country VARCHAR(255) NOT NULL,
--         contact_name VARCHAR(255) NOT NULL,
--         contact_position VARCHAR(255) NOT NULL,
--         contact_email VARCHAR(255) NOT NULL,
--         contact_phone VARCHAR(255) NOT NULL,
--         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
--     );

-- CREATE TABLE inventories (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     warehouse_id INT,
--     FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
--     item_name VARCHAR(255) NOT NULL,
--     description VARCHAR(255) NOT NULL,
--     category VARCHAR(255) NOT NULL,
--     quantity INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );
