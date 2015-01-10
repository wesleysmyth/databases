-- CREATE DATABASE chat;
USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  M_Id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int NOT NULL,
  room_id int NOT NULL,
  text varchar(255)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  /* Describe your table here.*/
  U_Id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

CREATE TABLE rooms (
  /* Describe your table here.*/
  R_Id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

