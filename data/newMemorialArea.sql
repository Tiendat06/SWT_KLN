
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
    role_id INT PRIMARY KEY,
    role_name VARCHAR(30)
);
END

-- Create Account table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Account')
BEGIN
CREATE TABLE Account (
    accountId UNIQUEIDENTIFIER PRIMARY KEY,
    username NVARCHAR(50),
    password NVARCHAR(50),
    hide BIT,
    passwordResetToken VARCHAR(max),
    tokenExpiration VARCHAR(max),
    role_id INT
);
END

-- Create User table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'User')
BEGIN
CREATE TABLE [User] (
    userId UNIQUEIDENTIFIER PRIMARY KEY,
    name NVARCHAR(30),
    email VARCHAR(40),
    accountId UNIQUEIDENTIFIER
);
END

-- Create SolemnVisit table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SolemnVisit')
BEGIN
CREATE TABLE SolemnVisit (
    visitId UNIQUEIDENTIFIER PRIMARY KEY,
    name NVARCHAR(30),
    portraitImage VARCHAR(max),
    letterImage VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
    isDeleted BIT
);
END

-- Create LogSolemnVisit table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogSolemnVisit')
BEGIN
CREATE TABLE LogSolemnVisit (
    visitId UNIQUEIDENTIFIER,
    name NVARCHAR(50),
    portraitImage VARCHAR(max),
    letterImage VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
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
    blogId UNIQUEIDENTIFIER PRIMARY KEY,
    blogImage VARCHAR(max),
    blogTitle NVARCHAR(255),
    blogContent NVARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
    isDeleted BIT
);
END

-- Create LogBlog table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogBlog')
BEGIN
CREATE TABLE LogBlog (
    blogId UNIQUEIDENTIFIER,
    blogImage VARCHAR(max),
    blogTitle NVARCHAR(255),
    blogContent NVARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
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
    slideImageId UNIQUEIDENTIFIER PRIMARY KEY,
    slideShowId UNIQUEIDENTIFIER,
    imageLink VARCHAR(max),
    capture VARCHAR(max),
    isDeleted BIT
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
    slideShowId UNIQUEIDENTIFIER,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
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
    slideShowId UNIQUEIDENTIFIER PRIMARY KEY,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
    isDeleted BIT
);
END

-- Create Topic table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Topic')
BEGIN
CREATE TABLE Topic (
    topicId UNIQUEIDENTIFIER PRIMARY KEY,
    capture VARCHAR(max),
    createDate DATETIME,
    isDeleted BIT,
    
    userId UNIQUEIDENTIFIER
);
END

-- Create LogTopic table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogTopic')
BEGIN
CREATE TABLE LogTopic (
    topicId UNIQUEIDENTIFIER,
    capture VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,

    logTopicId INT PRIMARY KEY IDENTITY(1,1),
    updateDate DATETIME,
    process VARCHAR(max),
    flag VARCHAR(1)
);
END

-- Create LogTopicMedia table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogTopicMedia')
BEGIN
CREATE TABLE LogTopicMedia (
    logTopicMediaId INT PRIMARY KEY IDENTITY(1,1),
    logTopicId INT,
    videoLink VARCHAR(512) NULL,
    imageLink VARCHAR(512) NULL,
    title NVARCHAR(255)
);
END

-- Create TopicMedia table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TopicMedia')
BEGIN
CREATE TABLE TopicMedia (
    topicMediaId UNIQUEIDENTIFIER PRIMARY KEY,
    title NVARCHAR(255),
    videoLink VARCHAR(512) NULL,
    imageLink VARCHAR(512) NULL,
    createDate DATETIME,
    isDeleted BIT,
    topicId UNIQUEIDENTIFIER
);
END

-- Create Book table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Book')
BEGIN
CREATE TABLE Book (
    bookId UNIQUEIDENTIFIER PRIMARY KEY,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
    bookContent NVARCHAR(max),
    publisher NVARCHAR(100),
    author NVARCHAR(100),
    yearPublic DATETIME,
    isDeleted BIT
);
END

-- Create LogBook table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogBook')
BEGIN
CREATE TABLE LogBook (
    bookId UNIQUEIDENTIFIER,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
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
    magazineId UNIQUEIDENTIFIER PRIMARY KEY,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
    magazineContent NVARCHAR(max),
    isDeleted BIT
);
END

-- Create LogMagazine table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogMagazine')
BEGIN
CREATE TABLE LogMagazine (
    magazineId UNIQUEIDENTIFIER,
    title NVARCHAR(255),
    image VARCHAR(max),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
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
        videoId UNIQUEIDENTIFIER PRIMARY KEY,
        title NVARCHAR(255),
        createDate DATETIME,
        userId UNIQUEIDENTIFIER,
        imageLink VARCHAR(max),
        videoLink VARCHAR(max),
        isDeleted BIT
    );
END

-- Create LogVideo table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogVideo')
BEGIN
CREATE TABLE LogVideo (
        videoId UNIQUEIDENTIFIER,
        title NVARCHAR(255),
        createDate DATETIME,
        userId UNIQUEIDENTIFIER,
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
    musicId UNIQUEIDENTIFIER PRIMARY KEY,
    title NVARCHAR(255),
    author NVARCHAR(50),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
    imageLink VARCHAR(max),
    audioLink VARCHAR(max),
    isDeleted BIT
);
END

-- Create LogMusic table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LogMusic')
BEGIN
CREATE TABLE LogMusic (
    musicId UNIQUEIDENTIFIER,
    title NVARCHAR(255),
    author NVARCHAR(50),
    createDate DATETIME,
    userId UNIQUEIDENTIFIER,
    imageLink VARCHAR(max),
    audioLink VARCHAR(max),
    logMusicId INT PRIMARY KEY IDENTITY(1,1),
    updateDate DATETIME,
    process VARCHAR(max),
    flag VARCHAR(1)
);
END


-- Tạo GUID cho User
DECLARE @userId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @userId_2 UNIQUEIDENTIFIER = NEWID();
DECLARE @userId_3 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho Account và liên kết với UserId
DECLARE @accountId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @accountId_2 UNIQUEIDENTIFIER = NEWID();
DECLARE @accountId_3 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho Blog và liên kết với UserId
DECLARE @blogId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @blogId_2 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho Book
DECLARE @bookId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @bookId_2 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho Magazine
DECLARE @magazineId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @magazineId_2 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho SolemnVisit
DECLARE @visitId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @visitId_2 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho SlideImage
DECLARE @slideImageId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @slideImageId_2 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho SlideShow
DECLARE @slideShowId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @slideShowId_2 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho Video
DECLARE @videoId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @videoId_2 UNIQUEIDENTIFIER = NEWID();

-- Tạo GUID cho Music
DECLARE @musicId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @musicId_2 UNIQUEIDENTIFIER = NEWID();

--Tạo  GUID cho Topic
DECLARE @topicId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @topicId_2 UNIQUEIDENTIFIER = NEWID();

--Tạo  GUID cho TopicMedia
DECLARE @topicMediaId_1 UNIQUEIDENTIFIER = NEWID();
DECLARE @topicMediaId_2 UNIQUEIDENTIFIER = NEWID();
DECLARE @topicMediaId_3 UNIQUEIDENTIFIER = NEWID();
DECLARE @topicMediaId_4 UNIQUEIDENTIFIER = NEWID();

-- Thêm index cho TopicMedia
SET QUOTED_IDENTIFIER ON;
CREATE INDEX IDX_TopicMedia_ImageLink ON TopicMedia(imageLink) WHERE imageLink IS NOT NULL;
CREATE INDEX IDX_TopicMedia_VideoLink ON TopicMedia(videoLink) WHERE videoLink IS NOT NULL;

-- Insert sample data only if the tables are empty
IF NOT EXISTS (SELECT * FROM [User])
BEGIN
INSERT INTO [User]
([userId], [name], [email], [accountId])
VALUES
    (@userId_1, 'Jake Johnson', 'jakejohnson@gmail.com', @accountId_1),
    (@userId_2, 'Marry Joe', 'marryjoe@gmail.com', @accountId_2),
    (@userId_3, 'Bob Dan', 'bobdan@gmail.com', @accountId_3);
END

IF NOT EXISTS (SELECT * FROM [Account])
BEGIN
INSERT INTO [Account]
([accountId], [username], [password], [hide], [passwordResetToken], [tokenExpiration], [role_id])
VALUES
    (@accountId_1, 'jakejohn', 'jake123456', 0, null, null, 1),
    (@accountId_2, 'marrymarry', 'marry456789', 0, null, null, 2),
    (@accountId_3, 'bobdann', 'bobdan753159', 0, null, null, 2);
END

IF NOT EXISTS (SELECT * FROM [Role])
BEGIN
INSERT INTO [Role] ([role_id],[role_name])
VALUES
    (1, 'Admin'),
    (2, 'User');
END

IF NOT EXISTS (SELECT * FROM [Blog])
BEGIN
INSERT INTO [Blog]
([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted])
VALUES
    (@blogId_1, 'https://res-console.cloudinary.com/dydpf7z8u/thumbnails/v1/image/upload/v1736512957/YWcxLTEzNTh4ODQ0X2lycmFucQ==/preview', 'Blog1', 'Blog1', '2025-01-14 03:04:50.827', @userId_1, 0),
    (@blogId_2, 'https://res-console.cloudinary.com/dydpf7z8u/thumbnails/v1/image/upload/v1736512957/YWczLTEwMjR4NjgzX2R6b2VqMg==/preview', 'Blog2', 'Blog2', '2025-01-14 03:04:50.827', @userId_2, 0);
END

IF NOT EXISTS (SELECT * FROM [Book])
BEGIN
INSERT INTO [Book]
([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic], [isDeleted])
VALUES
    (@bookId_1, 'Book1', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736513302/4_egzkgd.jpg', '2025-01-12 07:42:59.267', @userId_1, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512588/BacHoBacTonvaCacAnh.pdf', N'NXB Chính Trị Quốc Gia', N'Nguyễn Văn A', '2024', 0),
    (@bookId_2, 'Book2', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736513302/4_egzkgd.jpg', '2025-01-12 07:42:59.267', @userId_1, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512585/BacToncuocdoivasunghiep.pdf', N'NXB Sự Thật', N'Nguyễn Văn A', '2024', 0);
END

IF NOT EXISTS (SELECT * FROM Magazine)
BEGIN
INSERT INTO Magazine
([magazineId], [title], [image], [createDate], [userId], [magazineContent], [isDeleted])
VALUES
    (@magazineId_1, 'Magazine1', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512914/nhasan_5_s2yhyu.jpg', '2025-01-12 13:00:00', @userId_1, 'Content1', 0),
    (@magazineId_2, 'Magazine2', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512868/gioi-thieu-kln_eokgdn.jpg', '2025-01-13 13:00:00', @userId_2, 'Content2', 0);
END

IF NOT EXISTS (SELECT * FROM SolemnVisit)
BEGIN
INSERT INTO SolemnVisit
([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted])
VALUES
    (@visitId_1, 'Test01', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736514442/huynh-dam_i1e1tp.jpg', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736514499/huynh-dam_uew0d6.jpg', '2025-01-12 10:00:00', @userId_1, 0),
    (@visitId_2, 'Test02', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736514443/truong-thi-mai_ayboln.jpg', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736514498/truong-thi-mai_fs7kmz.jpg', '2025-01-13 11:00:00', @userId_1, 0);
END

IF NOT EXISTS (SELECT * FROM SlideImage)
BEGIN
INSERT INTO SlideImage
([slideImageId], [slideShowId], [imageLink], [capture], [isDeleted])
VALUES
    (@slideImageId_1, @slideShowId_1, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512950/nhatu2_jrrtfs.jpg', 'Capture1', 0),
    (@slideImageId_2, @slideShowId_2, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512868/cdvsn_conghoi_veyjno.jpg', 'Capture2', 0);
END

IF NOT EXISTS (SELECT * FROM SlideShow)
BEGIN
INSERT INTO SlideShow
([slideShowId], [title], [image], [createDate], [userId], [isDeleted])
VALUES
    (@slideShowId_1, N'SlideShow1', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512868/cdvsn_thomay_w9kejq.jpg', '2025-01-12 12:00:00', @userId_1, 0),
    (@slideShowId_2, N'SlideShow2', 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512873/cdvsn_condao_vazrvu.jpg', '2025-01-13 12:00:00', @userId_3, 0);
END

IF NOT EXISTS (SELECT * FROM Video)
BEGIN
INSERT INTO Video
([videoId], [title], [createDate], [userId], [imageLink], [videoLink], [isDeleted])
VALUES
    (@videoId_1, N'Video1', '2025-01-12 14:00:00', @userId_1, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512961/gettyimages-182880589-1493334765_y8yjmg.jpg', 'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736513161/motnhancach_hk0gcp.mp4', 0),
    (@videoId_2, N'Video2', '2025-01-13 14:00:00', @userId_2, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512961/gg_rabfx7.jpg', 'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736513087/TDTU_klsyu9.mp4', 0);
END

IF NOT EXISTS (SELECT * FROM Music)
BEGIN
INSERT INTO Music
([musicId], [title], [author], [createDate], [userId], [imageLink], [audioLink], [isDeleted])
VALUES
    (@musicId_1, N'Music1', N'Author One', '2025-01-12 15:00:00', @userId_1, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512956/ag2-860x520_hz77hl.jpg', 'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736072269/08_buaeek.mp3', 0),
    (@musicId_2, N'Music2', N'Author Two', '2025-01-13 15:00:00', @userId_3, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512980/nha-trung-bay1_y7i7mb.jpg', 'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736072246/06_c6ylkq.mp3', 0);
END

IF NOT EXISTS (SELECT * FROM Topic)
BEGIN
    INSERT INTO Topic
    ([topicId], [capture], [createDate], [isDeleted], [userId])
    VALUES
    (@topicId_1, 'Topic1', '2025-01-12 10:00:00', 0, @userId_1),
    (@topicId_2, 'Topic2', '2025-01-13 11:00:00', 0, @userId_1);
END

IF NOT EXISTS (SELECT * FROM TopicMedia)
BEGIN
    INSERT INTO TopicMedia
    ([topicMediaId], [title], [videoLink], [imageLink], [createDate], [isDeleted], [topicId])
    VALUES
    (@topicMediaId_1, 'Media1', NULL, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512982/tuong-dai-tdt-ag_kbhaka.jpg', '2025-01-12 10:05:00', 0, @topicId_1),
    (@topicMediaId_2, 'Media2', 'https://www.youtube.com/watch?v=VAp31dcKLLw&pp=ygUbY2h1ecOqbiDEkeG7gSB2w6ogYsOhYyB0w7Ru', NULL, '2025-01-12 10:10:00', 0, @topicId_1),
    (@topicMediaId_3, 'Media3', NULL, 'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512988/chuyendecondao_cr7hmo.jpg', '2025-01-13 11:05:00', 0, @topicId_2),
    (@topicMediaId_4, 'Media4', 'https://www.youtube.com/watch?v=VAp31dcKLLw&pp=ygUbY2h1ecOqbiDEkeG7gSB2w6ogYsOhYyB0w7Ru', NULL, '2025-01-13 11:10:00', 0, @topicId_2);
END