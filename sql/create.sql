SET SQL_SAFE_UPDATES = 0;

CREATE TABLE `world_cup`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY(`id`)
);

CREATE TABLE `world_cup`.`stadium` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `image` VARCHAR(255) NULL,
  PRIMARY KEY(`id`)
);

CREATE TABLE `world_cup`.`team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `continent` VARCHAR(45) NULL,
  `rank` INT NULL,
  `flag` VARCHAR(255) NULL,
  `points` INT NULL,
  `group_id` INT NULL,
  PRIMARY KEY(`id`),
--   INDEX `FK_TEAM_GROUP_idx` (`group_id` ASC) VISIBLE,
  CONSTRAINT `FK_TEAM_GROUP`
    FOREIGN KEY (`group_id`)
    REFERENCES `world_cup`.`group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE `world_cup`.`players` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `l_name` VARCHAR(45) NULL,
  `f_name` VARCHAR(45) NULL,
  `position` VARCHAR(45) NULL,
  `club` VARCHAR(45) NULL,
  `number` INT NULL,
  `team_id` INT NULL,
  PRIMARY KEY(`id`),
--   INDEX `FK_PLAYER_TEAM_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `FK_PLAYER_TEAM`
    FOREIGN KEY (`team_id`)
    REFERENCES `world_cup`.`team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE `world_cup`.`manager` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `l_name` VARCHAR(45) NULL,
  `f_name` VARCHAR(45) NULL,
  `team_id` INT NULL,
  PRIMARY KEY(`id`),
--   INDEX `FK_MANAGER_TEAM_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `FK_MANAGER_TEAM`
    FOREIGN KEY (`team_id`)
    REFERENCES `world_cup`.`team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE `world_cup`.`schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  `round` INT NULL,
  `date` INT NULL,
  `month` INT NULL,
  `localTime` VARCHAR(45), 
  `home_id` INT NULL,
  `away_id` INT NULL,
  `stadium_id` INT NULL,
  `home_score` INT NULL,
  `away_score` INT NULL,
  PRIMARY KEY (`id`),
--   INDEX `home_id_idx` (`home_id` ASC) VISIBLE,
--   INDEX `FK_AWAY_SCHE_idx` (`away_id` ASC) VISIBLE,
--   INDEX `FK_STAD_SCHE_idx` (`stadium_id` ASC) VISIBLE,
  CONSTRAINT `FK_HOME_SCHE`
    FOREIGN KEY (`home_id`)
    REFERENCES `world_cup`.`team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_AWAY_SCHE`
    FOREIGN KEY (`away_id`)
    REFERENCES `world_cup`.`team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_STAD_SCHE`
    FOREIGN KEY (`stadium_id`)
    REFERENCES `world_cup`.`stadium` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

SET SQL_SAFE_UPDATES = 1;
