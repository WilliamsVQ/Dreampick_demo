ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'at20123';
flush privileges;

CREATE DATABASE questionnairedb;

USE questionnairedb;

CREATE TABLE test (
IDTest INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
PRIMARY KEY (IDTest)
);

CREATE TABLE type (
  IDType INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (IDType)
);

CREATE TABLE questions (
  IDQuestions INT NOT NULL AUTO_INCREMENT,
  Question VARCHAR(80) NOT NULL,
  Answer VARCHAR(80) NOT NULL,
  ImgScr VARCHAR(50),
  IDTest INT NOT NULL,
  IDType INT NOT NULL,
  PRIMARY KEY (IDQuestions),
  FOREIGN KEY (IDTest) REFERENCES test(IDTest),
  FOREIGN KEY (IDType) REFERENCES type(IDType)
);

CREATE TABLE options (
  IDOptions INT NOT NULL AUTO_INCREMENT,
  Label VARCHAR(50) NOT NULL,
  Value VARCHAR(50) NOT NULL,
  ImgSrc VARCHAR(50),
  IDQuestions INT NOT NULL,
  PRIMARY KEY (IDOptions),
  FOREIGN KEY (IDQuestions) REFERENCES questions(IDQuestions)
);


INSERT INTO test (nombre) VALUES ('aptitude');
INSERT INTO test (nombre) VALUES ('concentration');
INSERT INTO test (nombre) VALUES ('logical');
INSERT INTO test (nombre) VALUES ('reasoning');
INSERT INTO test (nombre) VALUES ('spatial');
INSERT INTO type (nombre) VALUES ('checkBox');
INSERT INTO type (nombre) VALUES ('radioButton');