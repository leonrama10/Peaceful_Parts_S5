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
DROP TABLE IF EXISTS `relationship_status`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `relationship_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `relationship_status` (`answer`)
VALUES
('Single'), ('In a relationship'),('Married'),('Divorced');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapy_history`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapy_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `therapy_history` (`answer`)
VALUES
('Yes'), ('No');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `medication_history`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `medication_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `medication_history` (`answer`)
VALUES
('Yes'), ('No');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `communication`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `communication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `communication` (`answer`)
VALUES
('Mostly via messaging'), ('Mostly via phone'),('Video sessions'),('Not sure yet (decide later)');

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
DROP TABLE IF EXISTS `physical_health`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `physical_health` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `physical_health` (`answer`)
VALUES
('Good'), ('Fair'), ('Poor');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `mental_state_1`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `mental_state_1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `mental_state_1` (`answer`)
VALUES
('Not at all'), ('Several days'), ('More than half the days'),('Nearly every day');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `mental_state_2`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `mental_state_2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `mental_state_2` (`answer`)
VALUES
('Not at all'), ('Several days'), ('More than half the days'),('Nearly every day');

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
    `therapist_gender` int(11),
    `therapist_type_id` int(11),
    `relationship_status_id` int(11),
    `therapy_history_id` int(11),
    `medication_history_id` int(11),
    `communication_id` int(11),
    `physical_health_id` int(11),
    `mental_state_1_id` int(11),
    `mental_state_2_id` int(11),
    `location_id` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`mental_state_2_id`) REFERENCES `mental_state_2`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`mental_state_1_id`) REFERENCES `mental_state_1`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`physical_health_id`) REFERENCES `physical_health`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`communication_id`) REFERENCES `communication`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`medication_history_id`) REFERENCES `medication_history`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`therapy_history_id`) REFERENCES `therapy_history`(`id`) ON DELETE CASCADE on update cascade,
    FOREIGN KEY (`relationship_status_id`) REFERENCES `relationship_status`(`id`) ON DELETE CASCADE on update cascade,
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

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `point`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `point` (
    `id` INT AUTO_INCREMENT,
    `point` varchar(1000),
    PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `main_points`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `main_points` (
    `id` INT AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `main_points_point`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `main_points_point` (
  `main_points_id` int(11) NOT NULL,
  `point_id` int(11) NOT NULL,
  
  PRIMARY KEY (`main_points_id`,`point_id`),
  
  KEY `FK_POINT_idx` (`point_id`),
  
  CONSTRAINT `FK_MAINPOINTS_POINT` FOREIGN KEY (`main_points_id`) 
  REFERENCES `main_points` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_POINT_MAINPOINTS` FOREIGN KEY (`point_id`) 
  REFERENCES `point` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `notes`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `notes` (
    `id` INT AUTO_INCREMENT,
    `notes_text` varchar(1000),
    `patient_mood_before` int(10),
    `patient_mood_after` int(10),
    `main_points_id` int(11),
    `date_added` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`main_points_id`) REFERENCES `main_points`(`id`) ON DELETE CASCADE
) AUTO_INCREMENT=1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_notes`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapist_notes` (
    `id` INT AUTO_INCREMENT,
    `notes_id` int(11) NOT NULL,
    `client_id` int(11) NOT NULL,
	`therapist_id` int(11) NOT NULL,
    `date_added` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`client_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ,
    FOREIGN KEY (`notes_id`) REFERENCES `notes`(`id`) ON DELETE CASCADE on update cascade,
	FOREIGN KEY (`therapist_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) AUTO_INCREMENT=1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_notes_history`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapist_notes_history` (
    `id` INT AUTO_INCREMENT,
    `notes_id` int(11),
    `client_id` int(11) NOT NULL,
	`therapist_id` int(11) NOT NULL,
    `date_added` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`notes_id`) REFERENCES `notes`(`id`) ON DELETE CASCADE on update cascade,
	FOREIGN KEY (`client_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
	FOREIGN KEY (`therapist_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) AUTO_INCREMENT=1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `weekdays`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `weekdays` (
    `id` INT AUTO_INCREMENT,
    `day` varchar(25) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `weekdays` (`day`)
VALUES
('Monday'), ('Tuesday'), ('Wednesday'),('Thursday'),('Friday'),('Saturday'),('Sunday');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `workhours`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `workhours` (
    `id` INT AUTO_INCREMENT,
    `hour` Time NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `workhours` (`hour`)
VALUES
('01:00'), ('02:00'), ('03:00'),('04:00'),('05:00'),('06:00'),('07:00'),('08:00'),('09:00'),('10:00'),('11:00'),('12:00'),('13:00'),('14:00'),('15:00'),('16:00'),('17:00'),('18:00'),('19:00'),('20:00'),('21:00'),('22:00'),('23:00'),('00:00');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_work_days`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapist_work_days` (
    `id` INT AUTO_INCREMENT,
    `therapist_id` INT(11),
    PRIMARY KEY (id)
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_work_days_weekdays`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapist_work_days_weekdays` (
  `therapist_work_days_id` int(11) NOT NULL,
  `weekdays_id` int(11) NOT NULL,
  
  PRIMARY KEY (`therapist_work_days_id`,`weekdays_id`),
  
  KEY `FK_WEEKDAYS_idx` (`weekdays_id`),
  
  CONSTRAINT `FK_THERAPY_WORK_DAYS_WEEKDAYS` FOREIGN KEY (`therapist_work_days_id`) 
  REFERENCES `therapist_work_days` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_WEEKDAYS_THERAPY_WORK_DAYS` FOREIGN KEY (`weekdays_id`) 
  REFERENCES `weekdays` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `therapist_work_days_workhours`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `therapist_work_days_workhours` (
  `therapist_work_days_id` int(11) NOT NULL,
  `workhours_id` int(11) NOT NULL,
  
  PRIMARY KEY (`therapist_work_days_id`,`workhours_id`),
  
  KEY `FK_WORKHOURS_idx` (`workhours_id`),
  
  CONSTRAINT `FK_THERAPY_WORK_DAYS_WORKDAYS` FOREIGN KEY (`therapist_work_days_id`) 
  REFERENCES `therapist_work_days` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_WORKDAYS_THERAPY_WORK_DAYS` FOREIGN KEY (`workhours_id`) 
  REFERENCES `workhours` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `bookings`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `bookings` (
    `id` INT AUTO_INCREMENT,
    `client_id` int(11),
    `date` Date NOT NULL,
    `hour` TIME NOT NULL,
    `therapist_work_days_id` int(11), 
    PRIMARY KEY (id),
    FOREIGN KEY (`therapist_work_days_id`) REFERENCES `therapist_work_days`(`id`) ON DELETE CASCADE on update cascade
);