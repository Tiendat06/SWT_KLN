-- CREATE DATABASE MemorialArea;
-- GO
-- USE MemorialArea;
--
-- -- Create Role table
-- CREATE TABLE Role (
--     role_id VARCHAR(10) PRIMARY KEY,
--     role_name VARCHAR(30)
-- );
--
-- -- Create Account table
-- CREATE TABLE Account (
--     accountId VARCHAR(10) PRIMARY KEY,
--     username NVARCHAR(50),
--     password VARCHAR(50),
--     hide BIT,
--     passwordResetToken VARCHAR,
--     tokenExpiration VARCHAR,
--     role_id VARCHAR(10),
-- );
--
-- -- Create User table
-- CREATE TABLE [User] (
--     userId VARCHAR(10) PRIMARY KEY,
--     name NVARCHAR(30),
-- 	email VARCHAR(40),
--     accountId VARCHAR(10),
-- );
--
-- -- Create SolemnVisit table
-- CREATE TABLE SolemnVisit (
--     visitId VARCHAR(10) PRIMARY KEY,
--     name NVARCHAR(30),
--     portraitImage VARCHAR(max),
--     letterImage VARCHAR(max),
--     createDate DATETIME,
--     userId VARCHAR(10),
-- );
--
-- -- LogSolemVisit
-- CREATE TABLE LogSolemVisit (
-- 	visitId VARCHAR(10),
--     name NVARCHAR(50),
--     portraitImage VARCHAR(max),
--     letterImage VARCHAR(max),
--     createDate DATE,
--     userId VARCHAR(10),
-- 	logSolemnId INT PRIMARY KEY,
-- 	version VARCHAR(max),
-- 	updateDate DATETIME,
-- 	process VARCHAR(max),
-- 	flag VARCHAR(1),
-- );
--
-- -- Create Blog table
-- CREATE TABLE Blog (
--     blogId VARCHAR(10) PRIMARY KEY,
--     blogTitle NVARCHAR(255),
--     blogContent NVARCHAR(max),
--     createDate DATETIME,
--     userId VARCHAR(10),
-- );
--
-- CREATE TABLE LogBlog (
-- 	blogId VARCHAR(10),
--     blogTitle NVARCHAR(255),
--     blogContent NVARCHAR(max),
--     createDate DATETIME,
--     userId VARCHAR(10),
-- 	logBlogId INT PRIMARY KEY,
-- 	version VARCHAR(max),
-- 	updateDate DATETIME,
-- 	process VARCHAR(max),
-- 	flag VARCHAR(1),
-- );
--
-- -- Create Image table
-- CREATE TABLE SlideImage (
--     slideImageId INT PRIMARY KEY,
--     slideShowId VARCHAR(10),
--     imageLink VARCHAR(max),
--     capture VARCHAR(max),
-- );
--
-- CREATE TABLE LogSlideImage (
-- 	logSlideImageId INT PRIMARY KEY,
-- 	logSlideShowId INT,
-- 	imageLink VARCHAR(max),
-- 	capture VARCHAR(max),
-- );
--
-- CREATE TABLE LogSlideShow (
-- 	slideShowId VARCHAR(10),
-- 	title NVARCHAR(255),
--     image VARCHAR(max),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
-- 	logSlideShowId INT PRIMARY KEY,
-- 	version VARCHAR(max),
-- 	updateDate DATETIME,
-- 	process VARCHAR(max),
-- 	flag VARCHAR(1),
-- );
--
-- CREATE TABLE SlideShow (
-- 	slideShowId VARCHAR(10) PRIMARY KEY,
-- 	title NVARCHAR(255),
--     image VARCHAR(max),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
-- );
--
-- -- Create Book table
-- CREATE TABLE Book (
--     bookId VARCHAR(10) PRIMARY KEY,
-- 	title NVARCHAR(255),
--     image VARCHAR(max),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
--     bookContent NVARCHAR(max),
--     publisher NVARCHAR(50),
--     author NVARCHAR(50),
--     yearPublic DATETIME,
-- );
--
-- CREATE TABLE LogBook (
-- 	bookId VARCHAR(10),
-- 	title NVARCHAR(255),
--     image VARCHAR(max),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
--     bookContent NVARCHAR(max),
--     publisher VARCHAR(50),
--     author VARCHAR(50),
--     yearPublic DATETIME,
-- 	logBookId INT PRIMARY KEY,
-- 	version VARCHAR(max),
-- 	updateDate DATETIME,
-- 	process VARCHAR(max),
-- 	flag VARCHAR(1),
-- );
--
-- -- Create Magazine table
-- CREATE TABLE Magazine (
--     magazineId VARCHAR(10) PRIMARY KEY,
-- 	title NVARCHAR(255),
--     image VARCHAR(max),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
--     magazineContent NVARCHAR(max),
-- );
--
-- CREATE TABLE LogMagazine (
-- 	magazineId VARCHAR(10),
-- 	title NVARCHAR(255),
--     image VARCHAR(max),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
--     magazineContent NVARCHAR(max),
-- 	logMagazineId INT PRIMARY KEY,
-- 	version VARCHAR(max),
-- 	updateDate DATETIME,
-- 	process VARCHAR(max),
-- 	flag VARCHAR(1),
-- );
--
-- -- Create Video table
-- CREATE TABLE Video (
--     videoId VARCHAR(10) PRIMARY KEY,
-- 	title NVARCHAR(255),
--     image VARCHAR(max),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
-- 	imageLink VARCHAR(max),
--     videoLink VARCHAR(max),
-- );
--
-- CREATE TABLE LogVideo (
--     videoId VARCHAR(10),
-- 	title NVARCHAR(255),
--     image VARCHAR(max),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
-- 	imageLink VARCHAR(max),
--     videoLink VARCHAR(max),
-- 	logVideoId INT PRIMARY KEY,
-- 	version VARCHAR(max),
-- 	updateDate DATETIME,
-- 	process VARCHAR(max),
-- 	flag VARCHAR(1),
-- );
--
-- -- Create Music table
-- CREATE TABLE Music (
--     musicId VARCHAR(10) PRIMARY KEY,
-- 	title NVARCHAR(255),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
-- 	imageLink VARCHAR(max),
--     audioLink VARCHAR(max),
-- );
--
-- CREATE TABLE LogMusic (
-- 	musicId VARCHAR(10),
-- 	title NVARCHAR(255),
-- 	createDate DATETIME,
-- 	userId VARCHAR(10),
-- 	imageLink VARCHAR(max),
--     audioLink VARCHAR(max),
-- 	logMusicId INT PRIMARY KEY,
-- 	version VARCHAR(max),
-- 	updateDate DATETIME,
-- 	process VARCHAR(max),
-- 	flag VARCHAR(1),
-- );
--
-- insert into [User]
--     ([userId], [name], [email], [accountId])
-- VALUES
--     ('USR0000001', 'Jake Johnson', 'jakejohnson@gmail.com', 'ACC0000001'),
--     ('USR0000002', 'Marry Joe', 'marryjoe@gmail.com', 'ACC0000002'),
--     ('USR0000003', 'Bob Dan', 'bobdan@gmail.com', 'ACC0000003');
--
-- insert into [Account]
--     ([accountId], [username], [password], [hide], [passwordResetToken], [tokenExpiration], [role_id])
-- VALUES
--     ('ACC0000001', 'jakejohn', 'jake123456', 0, null, null, 'ROL0000001'),
--     ('ACC0000002', 'marrymarry', 'marry456789', 0, null, null, 'ROL0000002'),
--     ('ACC0000003', 'bobdann', 'bobdan753159', 0, null, null, 'ROL0000002');
-- insert into [Role]
--     VALUES
-- ('ROL0000001', 'Admin'),
-- ('ROL0000002', 'User');

---------------------------------------------------------------------------------

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MemorialArea')
BEGIN
    CREATE DATABASE MemorialArea;
END

GO

USE MemorialArea;

-- Create Role table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Role')
BEGIN
CREATE TABLE Role (
    role_id VARCHAR(10) PRIMARY KEY,
    role_name VARCHAR(30)
);
END

-- Create Account table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Account')
BEGIN
CREATE TABLE Account (
    accountId VARCHAR(10) PRIMARY KEY,
    username NVARCHAR(50),
    password NVARCHAR(50),
    hide BIT,
    passwordResetToken VARCHAR(max),
    tokenExpiration VARCHAR(max),
    role_id VARCHAR(10)
);
END

-- Create User table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'User')
BEGIN
CREATE TABLE [User] (
    userId VARCHAR(10) PRIMARY KEY,
    name NVARCHAR(30),
    email VARCHAR(40),
    accountId VARCHAR(10)
);
END

-- Create SolemnVisit table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SolemnVisit')
BEGIN
CREATE TABLE SolemnVisit (
    visitId VARCHAR(10) PRIMARY KEY,
    name NVARCHAR(30),
    portraitImage VARCHAR(max),
    letterImage VARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10)
);
END

-- Create LogSolemnVisit table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogSolemnVisit')
BEGIN
CREATE TABLE LogSolemnVisit (
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
    flag VARCHAR(1)
);
END

-- Create Blog table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Blog')
BEGIN
CREATE TABLE Blog (
    blogId VARCHAR(10) PRIMARY KEY,
    blogTitle NVARCHAR(255),
    blogContent NVARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10)
);
END

-- Create LogBlog table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogBlog')
BEGIN
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
    flag VARCHAR(1)
);
END

-- Create SlideImage table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SlideImage')
BEGIN
CREATE TABLE SlideImage (
    slideImageId INT PRIMARY KEY,
    slideShowId VARCHAR(10),
    imageLink VARCHAR(max),
    capture VARCHAR(max)
);
END

-- Create LogSlideImage table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogSlideImage')
BEGIN
CREATE TABLE LogSlideImage (
    logSlideImageId INT PRIMARY KEY,
    logSlideShowId INT,
    imageLink VARCHAR(max),
    capture VARCHAR(max)
);
END

-- Create LogSlideShow table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogSlideShow')
BEGIN
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
    flag VARCHAR(1)
);
END

-- Create SlideShow table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SlideShow')
BEGIN
CREATE TABLE SlideShow (
    slideShowId VARCHAR(10) PRIMARY KEY,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10)
);
END

-- Create Book table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Book')
BEGIN
CREATE TABLE Book (
    bookId VARCHAR(10) PRIMARY KEY,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10),
    bookContent NVARCHAR(max),
    publisher NVARCHAR(50),
    author NVARCHAR(50),
    yearPublic DATETIME
);
END

-- Create LogBook table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogBook')
BEGIN
CREATE TABLE LogBook (
    bookId VARCHAR(10),
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10),
    bookContent NVARCHAR(max),
    publisher NVARCHAR(50),
    author NVARCHAR(50),
    yearPublic DATETIME,
    logBookId INT PRIMARY KEY,
    version VARCHAR(max),
    updateDate DATETIME,
    process VARCHAR(max),
    flag VARCHAR(1)
);
END

-- Create Magazine table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Magazine')
BEGIN
CREATE TABLE Magazine (
    magazineId VARCHAR(10) PRIMARY KEY,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId VARCHAR(10),
    magazineContent NVARCHAR(max)
);
END

-- Create LogMagazine table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogMagazine')
BEGIN
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
    flag VARCHAR(1)
);
END

-- Create Video table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Video')
BEGIN
CREATE TABLE Video (
                       videoId VARCHAR(10) PRIMARY KEY,
                       title NVARCHAR(255),
                       image VARCHAR(max),
        createDate DATETIME,
        userId VARCHAR(10),
        imageLink VARCHAR(max),
        videoLink VARCHAR(max)
    );
END

-- Create LogVideo table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogVideo')
BEGIN
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
        flag VARCHAR(1)
    );
END

-- Create Music table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Music')
BEGIN
CREATE TABLE Music (
    musicId VARCHAR(10) PRIMARY KEY,
    title NVARCHAR(255),
    createDate DATETIME,
    userId VARCHAR(10),
    imageLink VARCHAR(max),
    audioLink VARCHAR(max)
);
END

-- Create LogMusic table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogMusic')
BEGIN
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
    flag VARCHAR(1)
);
END

-- Insert sample data only if the tables are empty
IF NOT EXISTS (SELECT * FROM [User])
BEGIN
INSERT INTO [User]
([userId], [name], [email], [accountId])
VALUES
    ('USR0000001', 'Jake Johnson', 'jakejohnson@gmail.com', 'ACC0000001'),
    ('USR0000002', 'Marry Joe', 'marryjoe@gmail.com', 'ACC0000002'),
    ('USR0000003', 'Bob Dan', 'bobdan@gmail.com', 'ACC0000003');
END

IF NOT EXISTS (SELECT * FROM [Account])
BEGIN
INSERT INTO [Account]
([accountId], [username], [password], [hide], [passwordResetToken], [tokenExpiration], [role_id])
VALUES
    ('ACC0000001', 'jakejohn', 'jake123456', 0, null, null, 'ROL0000001'),
    ('ACC0000002', 'marrymarry', 'marry456789', 0, null, null, 'ROL0000002'),
    ('ACC0000003', 'bobdann', 'bobdan753159', 0, null, null, 'ROL0000002');
END

IF NOT EXISTS (SELECT * FROM [Role])
BEGIN
INSERT INTO [Role]
VALUES
    ('ROL0000001', 'Admin'),
    ('ROL0000002', 'User');
END