DROP DATABASE IF EXISTS burger_db;

CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burger(
    id INT AUTO_INCREMENT,
    burger_name VARCHAR(255) NOT NULL,
    is_eaten TINYINT(1) DEFAULT 0,
    PRIMARY KEY(id)
);