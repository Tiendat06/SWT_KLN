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
    logSolemnId INT PRIMARY KEY IDENTITY(1,1),
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
    blogImage VARCHAR(max),
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
    logBlogId INT PRIMARY KEY IDENTITY(1,1),
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
    logSlideImageId INT PRIMARY KEY IDENTITY(1,1),
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
    logSlideShowId INT PRIMARY KEY IDENTITY(1,1),
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
    logBookId INT PRIMARY KEY IDENTITY(1,1),
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
    logMagazineId INT PRIMARY KEY IDENTITY(1,1),
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
        createDate DATETIME,
        userId VARCHAR(10),
        imageLink VARCHAR(max),
        videoLink VARCHAR(max),
        logVideoId INT PRIMARY KEY IDENTITY(1,1),
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
    author NVARCHAR(50),
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
    author NVARCHAR(50),
    createDate DATETIME,
    userId VARCHAR(10),
    imageLink VARCHAR(max),
    audioLink VARCHAR(max),
    logMusicId INT PRIMARY KEY IDENTITY(1,1),
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

IF NOT EXISTS (SELECT * FROM [Blog])
BEGIN
INSERT INTO [Blog]
([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId])
VALUES
    ('BLO000001', 'https://res-console.cloudinary.com/dydpf7z8u/thumbnails/v1/image/upload/v1736512957/YWcxLTEzNTh4ODQ0X2lycmFucQ==/preview', 'Blog1', 'Blog1', '2025-01-14 03:04:50.827', 'USR000001'),
    ('BLO000002', 'https://res-console.cloudinary.com/dydpf7z8u/thumbnails/v1/image/upload/v1736512957/YWczLTEwMjR4NjgzX2R6b2VqMg==/preview', 'Blog2', 'Blog2', '2025-01-14 03:04:50.827', 'USR000001');
END

IF NOT EXISTS (SELECT * FROM [Book])
BEGIN
INSERT INTO [Book]
([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic])
VALUES
    ('BLO0000001', 'Book1', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736513302/4_egzkgd.jpg', '2025-01-12 07:42:59.267', 'USR0000001', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512588/BacHoBacTonvaCacAnh.pdf', 'NXB Chính Trị Quốc Gia', 'Nguyễn Văn A', '2024');
END

IF NOT EXISTS (SELECT * FROM Magazine)
BEGIN
INSERT INTO Magazine
([magazineId], [title], [image], [createDate], [userId], [magazineContent])
VALUES
    ('MAG0000001', 'Magazine1', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512914/nhasan_5_s2yhyu.jpg', '2025-01-12 13:00:00', 'USR0000001', 'Content1'),
    ('MAG0000002', 'Magazine2', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512868/gioi-thieu-kln_eokgdn.jpg', '2025-01-13 13:00:00', 'USR0000002', 'Content2');
END

IF NOT EXISTS (SELECT * FROM SolemnVisit)
BEGIN
INSERT INTO SolemnVisit
([visitId], [name], [portraitImage], [letterImage], [createDate], [userId])
VALUES
    ('VIS0000001', 'Visit1', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736514442/huynh-dam_i1e1tp.jpg', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736514499/huynh-dam_uew0d6.jpg', '2025-01-12 10:00:00', 'USR0000001'),
    ('VIS0000002', 'Visit2', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736514443/truong-thi-mai_ayboln.jpg', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736514498/truong-thi-mai_fs7kmz.jpg', '2025-01-13 11:00:00', 'USR0000002');
END

IF NOT EXISTS (SELECT * FROM SlideImage)
BEGIN
INSERT INTO SlideImage
([slideImageId], [slideShowId], [imageLink], [capture])
VALUES
    (1, 'SSL0000001', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512950/nhatu2_jrrtfs.jpg', 'Capture1'),
    (2, 'SSL0000002', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512868/cdvsn_conghoi_veyjno.jpg', 'Capture2');
END

IF NOT EXISTS (SELECT * FROM SlideShow)
BEGIN
INSERT INTO SlideShow
([slideShowId], [title], [image], [createDate], [userId])
VALUES
    ('SSL0000001', 'SlideShow1', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512868/cdvsn_thomay_w9kejq.jpg', '2025-01-12 12:00:00', 'USR0000001'),
    ('SSL0000002', 'SlideShow2', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512873/cdvsn_condao_vazrvu.jpg', '2025-01-13 12:00:00', 'USR0000002');
END

IF NOT EXISTS (SELECT * FROM Video)
BEGIN
INSERT INTO Video
([videoId], [title], [createDate], [userId], [imageLink], [videoLink])
VALUES
    ('VID0000001', 'Video1', '2025-01-12 14:00:00', 'USR0000001', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512961/gettyimages-182880589-1493334765_y8yjmg.jpg', 'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736513161/motnhancach_hk0gcp.mp4'),
    ('VID0000002', 'Video2', '2025-01-13 14:00:00', 'USR0000002', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512961/gg_rabfx7.jpg', 'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736513087/TDTU_klsyu9.mp4');
END

IF NOT EXISTS (SELECT * FROM Music)
BEGIN
INSERT INTO Music
([musicId], [title], [author], [createDate], [userId], [imageLink], [audioLink])
VALUES
    ('MUS0000001', 'Music1', 'Author One', '2025-01-12 15:00:00', 'USR0000001', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512956/ag2-860x520_hz77hl.jpg', 'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736072269/08_buaeek.mp3'),
    ('MUS0000002', 'Music2', 'Author Two', '2025-01-13 15:00:00', 'USR0000002', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512980/nha-trung-bay1_y7i7mb.jpg', 'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736072246/06_c6ylkq.mp3');
END