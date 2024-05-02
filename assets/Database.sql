CREATE DATABASE  IF NOT EXISTS `therapist_directory`;
USE `therapist_directory`;

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `user`;
SET foreign_key_checks = 1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `gender`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `gender` (`gender`)
VALUES
('M'), ('F'),('O');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `location`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `location` (`location`)
VALUES
('Kosovo'), ('Albania'), ('Montenegro'),('North Macedonia'),('Serbia');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `language`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `language` (`language`)
VALUES
('Albanian'), ('English'), ('Serbian');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `university`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `university` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `university` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `university` (`university`)
VALUES
('AAB'), ('UBT'), ('KAKTUS'), ('UNIVERSITETI I PRISHTINES');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapy_type`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapy_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `therapy_type` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `therapy_type` (`therapy_type`)
VALUES
('Individual'), ('Couples'), ('Teen');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `identity_type`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `identity_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identity_type` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `identity_type` (`identity_type`)
VALUES
('Straight'), ('Gay'), ('Lesbian'),('Prefer not to say');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_type`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapist_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `therapist_type` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `therapist_type` (`therapist_type`)
VALUES
('Listens'), ('ExploresPast'), ('TeachesSkills'),('I dont know');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_info`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapist_info` (
    `id` INT AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `therapist_info` (`id`)
VALUES
(1), (2);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_info_therapy_type`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `therapist_info_therapy_type` (
  `therapist_info_id` int(11) NOT NULL,
  `therapy_type_id` int(11) NOT NULL,
  
  PRIMARY KEY (`therapist_info_id`,`therapy_type_id`),
  
  KEY `FK_THERAPY_TYPE_idx` (`therapy_type_id`),
  
  CONSTRAINT `FK_THERAPIST_INFO_THERAPY_TYPE` FOREIGN KEY (`therapist_info_id`) 
  REFERENCES `therapist_info` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_THERAPY_TYPE_THERAPIST_INFO` FOREIGN KEY (`therapy_type_id`) 
  REFERENCES `therapy_type` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `therapist_info_therapy_type` (therapist_info_id,therapy_type_id)
VALUES 
(1, 1),
(1, 2),
(2, 3);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_info_identity_type`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `therapist_info_identity_type` (
  `therapist_info_id` int(11) NOT NULL,
  `identity_type_id` int(11) NOT NULL,
  
  PRIMARY KEY (`therapist_info_id`,`identity_type_id`),
  
  KEY `FK_IDENTITY_TYPE_idx` (`identity_type_id`),
  
  CONSTRAINT `FK_THERAPIST_INFO_IDENTITY_TYPE` FOREIGN KEY (`therapist_info_id`) 
  REFERENCES `therapist_info` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_IDENTITY_TYPE_THERAPIST_INFO` FOREIGN KEY (`identity_type_id`) 
  REFERENCES `identity_type` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `therapist_info_identity_type` (therapist_info_id,identity_type_id)
VALUES 
(1, 1),
(1, 2),
(2, 3);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_info_therapist_type`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `therapist_info_therapist_type` (
  `therapist_info_id` int(11) NOT NULL,
  `therapist_type_id` int(11) NOT NULL,
  
  PRIMARY KEY (`therapist_info_id`,`therapist_type_id`),
  
  KEY `FK_IDENTITY_TYPE_idx` (`therapist_type_id`),
  
  CONSTRAINT `FK_THERAPIST_INFO_THERAPIST_TYPE` FOREIGN KEY (`therapist_info_id`) 
  REFERENCES `therapist_info` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_THERAPIST_TYPE_THERAPIST_INFO` FOREIGN KEY (`therapist_type_id`) 
  REFERENCES `therapist_type` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `therapist_info_therapist_type` (therapist_info_id,therapist_type_id)
VALUES 
(1, 1),
(1, 2),
(2, 3);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `questionnaire`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `questionnaire` (
    `id` INT AUTO_INCREMENT,
    `therapy_type_id`  int(11),
    `gender_id` int(11),
    `age` int(2),
    `identity_type_id`int(11),
    `relationship_status` VARCHAR(255),
    `therapy_history` VARCHAR(255),
    `medication_history` VARCHAR(255),
    `communication` VARCHAR(255),
    `therapist_gender` int(11),
    `therapist_type_id` int(11),
    `current_physical_health` VARCHAR(255),
    `mental_state_1` VARCHAR(255),
    `mental_state_2` VARCHAR(255),
    `location_id` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`gender_id`) REFERENCES `gender`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`identity_type_id`) REFERENCES `identity_type`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`therapy_type_id`) REFERENCES `therapy_type`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`therapist_type_id`) REFERENCES `therapist_type`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`therapist_gender`) REFERENCES `gender`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE CASCADE on update cascade
) AUTO_INCREMENT=1;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `date_of_birth` DATE DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `number` varchar(9) DEFAULT NULL,
  `experience` int NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `expiration_time` long,
  `password` char(68) NOT NULL,
  `questionnaire_id` int(11),
  `therapist_info_id` int(11),
  `location_id` int(11),
  `gender_id` int(11),
  `university_id` int(11),
  `date_added` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaire`(`id`) ON DELETE CASCADE on update cascade,
  FOREIGN KEY (`therapist_info_id`) REFERENCES `therapist_info`(`id`) ON DELETE CASCADE on update cascade,
  FOREIGN KEY (`gender_id`) REFERENCES `gender`(`id`) ON DELETE CASCADE on update cascade,
  FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE CASCADE on update cascade,
  FOREIGN KEY (`university_id`) REFERENCES `university`(`id`) ON DELETE CASCADE on update cascade
) AUTO_INCREMENT=1;

-- Admin-- 
INSERT INTO `user` (`name`, `surname`, `email`, `number`, `experience`, `password`, `reset_token`, `expiration_time`, `location_id`, `gender_id`, `university_id`, `date_of_birth`)
VALUES
('Leke', 'Markaj', 'markaj.leka@gmail.com', '044806543', 20, '$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.', NULL, 0, 1, 1, 1, '1992-05-15');

-- Therapist -- 
INSERT INTO `user` (`name`, `surname`, `email`, `number`, `experience`, `password`, `reset_token`, `expiration_time`, `location_id`, `gender_id`, `university_id`, `date_of_birth`,`therapist_info_id`)
VALUES
('Loren', 'Markaj', 'markaj.loren@gmail.com', '044333333', 1, '$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.', NULL, 0, 1, 1, 1, '1995-08-20',1),
('Leon', 'Markaj', 'markaj.leon@gmail.com', '044111111', 15, '$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.', NULL, 0, 2, 2, 2, '1988-03-10',2);

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
(2, 2),
(3, 2);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `user_language`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `user_language` (
  `user_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  
  PRIMARY KEY (`user_id`,`language_id`),
  
  KEY `FK_LANGUAGE_idx` (`language_id`),
  
  CONSTRAINT `FK_USER_LANGUAGE` FOREIGN KEY (`user_id`) 
  REFERENCES `user` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_LANGUAGE_USER` FOREIGN KEY (`language_id`) 
  REFERENCES `language` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user_language` (user_id,language_id)
VALUES 
(2, 1),
(2, 2),
(3, 3);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `questionnaire_language`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `questionnaire_language` (
  `questionnaire_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  
  PRIMARY KEY (`questionnaire_id`,`language_id`),
  
  KEY `FK_LANGUAGE_idx` (`language_id`),
  
  CONSTRAINT `FK_QUESTIONNAIRE_LANGUAGE` FOREIGN KEY (`questionnaire_id`) 
  REFERENCES `questionnaire` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_LANGUAGE_QUESTIONNAIRE` FOREIGN KEY (`language_id`) 
  REFERENCES `language` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `user_connections`;

CREATE TABLE `user_connections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL unique,
  `connected_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`connected_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `user_connections_history`;

CREATE TABLE `user_connections_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT ,
  `user_id` int(11) NOT NULL ,
  `connected_user_id` int(11) NOT NULL,
  `date_added` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`connected_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) AUTO_INCREMENT=1;

