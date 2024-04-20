CREATE DATABASE  IF NOT EXISTS `therapist_directory`;
USE `therapist_directory`;

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `user`;
SET foreign_key_checks = 1;

DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `gender` (`gender`)
VALUES
('M'), ('F');

DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `location` (`location`)
VALUES
('Zllakuqan'), ('Los Angeles'), ('Chicago');

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `number` varchar(9) DEFAULT NULL,
  `location_id` int(11),
  `experience` int NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `expiration_time` long,
  `password` char(68) NOT NULL,
  `gender_id` int(11),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`gender_id`) REFERENCES `gender`(`id`),
  FOREIGN KEY (`location_id`) REFERENCES `location`(`id`)
) AUTO_INCREMENT=1;

INSERT INTO `user` (`name`,`surname`,`email`,`number`,`location_id`,`experience`,`password`,`reset_token`,`expiration_time`,`gender_id`)
VALUES	
('Leke','Markaj','markaj.leka@gmail.com','044806543',1,20,'$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.',null,0,1),
('Tush','Markaj','markaj.tush@gmail.com','044123456',2,50,'$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.',null,0,1),
('Luigj','Markaj','markaj.luigj@gmail.com','044222222',3,10,'$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.',null,0,1),
('Loren','Markaj','markaj.loren@gmail.com','044333333',1,1,'$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.',null,0,1),
('Leon','Markaj','markaj.leon@gmail.com','044111111',2,15,'$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.',null,0,1);

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `roles`(`role`)
VALUES
('ROLE_USER'),('ROLE_THERAPIST'),('ROLE_ADMIN');

DROP TABLE IF EXISTS `user_roles`;

CREATE TABLE `user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  
  PRIMARY KEY (`user_id`,`role_id`),
  
  KEY `FK_ROLE_idx` (`role_id`),
  
  CONSTRAINT `FK_USER` FOREIGN KEY (`user_id`) 
  REFERENCES `user` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION,
  
  CONSTRAINT `FK_ROLEE` FOREIGN KEY (`role_id`) 
  REFERENCES `roles` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `user_roles` (user_id,role_id)
VALUES 
(1, 3),
(2, 1),
(3, 1),
(4, 2),
(5, 2);

DROP TABLE IF EXISTS `user_connections`;

CREATE TABLE `user_connections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL unique,
  `connected_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`connected_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) AUTO_INCREMENT=1;

CREATE TABLE `user_connections_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL unique,
  `connected_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`connected_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) AUTO_INCREMENT=1;

