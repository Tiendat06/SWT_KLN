CREATE DATABASE MemorialArea
GO
USE MemorialArea

-- Create Role table
CREATE TABLE Role (
    role_id VARCHAR(10) PRIMARY KEY,
    role_name VARCHAR(30)
);

-- Create Account table
CREATE TABLE Account (
    accountId VARCHAR(10) PRIMARY KEY,
    username NVARCHAR(50),
    password VARCHAR(50),
    hide BIT,
    passwordResetToken VARCHAR,
    tokenExpiration VARCHAR,
    role_id VARCHAR(10),
);

-- Create User table
CREATE TABLE [User] (
    userId VARCHAR(10) PRIMARY KEY,
    name NVARCHAR(30),
	email VARCHAR(40),
    accountId VARCHAR(10),
);

-- Create SolemnVisit table
CREATE TABLE SolemnVisit (
    visitId VARCHAR(10) PRIMARY KEY,
    name NVARCHAR(30),
    portraitImage VARCHAR(max),
    letterImage VARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10),
);

-- LogSolemVisit
CREATE TABLE LogSolemVisit (
	visitId VARCHAR(10),
    name NVARCHAR(50),
    portraitImage VARCHAR(max),
    letterImage VARCHAR(max),
    createDate DATE,
    userId VARCHAR(10),
	logSolemnId INT PRIMARY KEY,
	version VARCHAR(max),
	updateDate DATETIME,
	process VARCHAR(max),
	flag VARCHAR(1),
);

-- Create Blog table
CREATE TABLE Blog (
    blogId VARCHAR(10) PRIMARY KEY,
    blogTitle NVARCHAR(255),
    blogContent NVARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10),
);

CREATE TABLE LogBlog (
	blogId VARCHAR(10),
    blogTitle NVARCHAR(255),
    blogContent NVARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10),
	logBlogId INT PRIMARY KEY,
	version VARCHAR(max),
	updateDate DATETIME,
	process VARCHAR(max),
	flag VARCHAR(1),
);

-- Create Image table
CREATE TABLE SlideImage (
    slideImageId INT PRIMARY KEY,
    slideShowId VARCHAR(10),
    imageLink VARCHAR(max),
    capture VARCHAR(max),
);

CREATE TABLE LogSlideImage (
	logSlideImageId INT PRIMARY KEY,
	logSlideShowId INT,
	imageLink VARCHAR(max),
	capture VARCHAR(max),
);

CREATE TABLE LogSlideShow (
	slideShowId VARCHAR(10),
	title NVARCHAR(255),
    image VARCHAR(max),
	createDate DATETIME,
	userId VARCHAR(10),
	logSlideShowId INT PRIMARY KEY,
	version VARCHAR(max),
	updateDate DATETIME,
	process VARCHAR(max),
	flag VARCHAR(1),
);

CREATE TABLE SlideShow (
	slideShowId VARCHAR(10) PRIMARY KEY,
	title NVARCHAR(255),
    image VARCHAR(max),
	createDate DATETIME,
	userId VARCHAR(10),
);

-- Create Book table
CREATE TABLE Book (
    bookId VARCHAR(10) PRIMARY KEY,
	title NVARCHAR(255),
    image VARCHAR(max),
	createDate DATETIME,
	userId VARCHAR(10),
    bookContent NVARCHAR(max),
    publisher NVARCHAR(50),
    author NVARCHAR(50),
    yearPublic DATETIME,
);

CREATE TABLE LogBook (
	bookId VARCHAR(10),
	title NVARCHAR(255),
    image VARCHAR(max),
	createDate DATETIME,
	userId VARCHAR(10),
    bookContent NVARCHAR(max),
    publisher VARCHAR(50),
    author VARCHAR(50),
    yearPublic DATETIME,
	logBookId INT PRIMARY KEY,
	version VARCHAR(max),
	updateDate DATETIME,
	process VARCHAR(max),
	flag VARCHAR(1),
);

-- Create Magazine table
CREATE TABLE Magazine (
    magazineId VARCHAR(10) PRIMARY KEY,
	title NVARCHAR(255),
    image VARCHAR(max),
	createDate DATETIME,
	userId VARCHAR(10),
    magazineContent NVARCHAR(max),
);

CREATE TABLE LogMagazine (
	magazineId VARCHAR(10),
	title NVARCHAR(255),
    image VARCHAR(max),
	createDate DATETIME,
	userId VARCHAR(10),
    magazineContent NVARCHAR(max),
	logMagazineId INT PRIMARY KEY,
	version VARCHAR(max),
	updateDate DATETIME,
	process VARCHAR(max),
	flag VARCHAR(1),
);

-- Create Video table
CREATE TABLE Video (
    videoId VARCHAR(10) PRIMARY KEY,
	title NVARCHAR(255),
    image VARCHAR(max),
	createDate DATETIME,
	userId VARCHAR(10),
	imageLink VARCHAR(max),
    videoLink VARCHAR(max),
);

CREATE TABLE LogVideo (
    videoId VARCHAR(10),
	title NVARCHAR(255),
    image VARCHAR(max),
	createDate DATETIME,
	userId VARCHAR(10),
	imageLink VARCHAR(max),
    videoLink VARCHAR(max),
	logVideoId INT PRIMARY KEY,
	version VARCHAR(max),
	updateDate DATETIME,
	process VARCHAR(max),
	flag VARCHAR(1),
);

-- Create Music table
CREATE TABLE Music (
    musicId VARCHAR(10) PRIMARY KEY,
	title NVARCHAR(255),
	createDate DATETIME,
	userId VARCHAR(10),
	imageLink VARCHAR(max),
    audioLink VARCHAR(max),
);

CREATE TABLE LogMusic (
	musicId VARCHAR(10),
	title NVARCHAR(255),
	createDate DATETIME,
	userId VARCHAR(10),
	imageLink VARCHAR(max),
    audioLink VARCHAR(max),
	logMusicId INT PRIMARY KEY,
	version VARCHAR(max),
	updateDate DATETIME,
	process VARCHAR(max),
	flag VARCHAR(1),
);