--c'est seulement à executer dans la base de données
--script de la créationde la base de données et les tables
CREATE DATABASE rummy_db;

USE rummy_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_code VARCHAR(10) NOT NULL UNIQUE,
  game_status ENUM('waiting', 'ongoing', 'finished') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  deck JSON NOT NULL,
  hands JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  suit ENUM('hearts', 'diamonds', 'clubs', 'spades') NOT NULL,
  rank ENUM('2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A') NOT NULL
);
