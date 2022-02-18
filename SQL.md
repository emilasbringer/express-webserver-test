# Anteckningar




```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';


SHOW databases;
CREATE DATABASE databasnamn CHARACTER SET UTF8mb4 COLLATE utf8mb4_0900_ai_ci;
USE 'database';

CREATE TABLE tabellnamn (id INT UNSIGNED AUTO_INCREMENT, PRIMARY KEY(id)) 
ENGINE = innodb
DEFAULT CHARSET = utf8mb4;

ALTER TABLE tabellnamn ADD kolumn datatyp parametrar;

INT, heltal.
DECIMAL(p, s), kräver att precisionen och storleken anges.
VARCHAR(l), en sträng med variabel storlek, kräver att längden anges. 
TEXT, för större strängar.
TIMESTAMP, en datumstämpel.

ALTER TABLE users ADD name VARCHAR(30);

NULL, kolumnens värde kan vara tomt.
NOT NULL, kolumnens värde får inte vara tomt.
UNSIGNED, ändrar en numerär kolumn så att den enbart kan innehålla icke negativa värden.
AUTO_INCREMENT, använder databasens räknare för värdet.
UNIQUE, värdet måste vara unikt.

ex,
ALTER TABLE users ADD email VARCHAR(255) UNIQUE;

USE databasnamn, använd databas.
SHOW databases eller tables, visa val.
DESCRIBE tabell, beskriver eller visar en tabells struktur.
DROP databas eller tabell, ta bort val.
ALTER TABLE tabellnamn DROP kolumn, ta bort val.
SELECT kolumner FROM tabellnamn, för att välja data.

INSERT INTO users (name, email) VALUES ("username","username@test.se");

SELECT name, email FROM users;
SELECT * FROM users;

SELECT kolumn FROM tabell ORDER BY kolumn DESC LIMIT 1;

ORDER BY kolumn, sorterar resultatet efter vald kolumn.
DESC eller ASC väljer sorteringsordningen.
LIMIT #, begränsa resultatet till # antal rader.

SELECT * FROM users WHERE name = 'username';

LIMIT ORDER BY kolumn DESC/ASC;


```