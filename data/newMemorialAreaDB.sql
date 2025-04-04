IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MemorialArea')
BEGIN
    CREATE DATABASE MemorialArea;
END

GO
USE [MemorialArea]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 3/23/2025 10:34:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[accountId] [uniqueidentifier] NOT NULL,
	[username] [nvarchar](50) NULL,
	[password] [nvarchar](50) NULL,
	[hide] [bit] NULL,
	[passwordResetToken] [varchar](max) NULL,
	[tokenExpiration] [varchar](max) NULL,
	[role_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[accountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Blog]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Blog](
	[blogId] [uniqueidentifier] NOT NULL,
	[blogImage] [varchar](max) NULL,
	[blogTitle] [nvarchar](255) NULL,
	[blogContent] [nvarchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[isDeleted] [bit] NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[blogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Book]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Book](
	[bookId] [uniqueidentifier] NOT NULL,
	[title] [nvarchar](255) NULL,
	[image] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[bookContent] [nvarchar](max) NULL,
	[publisher] [nvarchar](100) NULL,
	[author] [nvarchar](100) NULL,
	[yearPublic] [varchar](20) NULL,
	[isDeleted] [bit] NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[bookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogBlog]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogBlog](
	[blogId] [uniqueidentifier] NULL,
	[blogImage] [varchar](max) NULL,
	[blogTitle] [nvarchar](255) NULL,
	[blogContent] [nvarchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[logBlogId] [int] IDENTITY(1,1) NOT NULL,
	[updateDate] [datetime] NULL,
	[process] [varchar](max) NULL,
	[flag] [varchar](1) NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[logBlogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogBook]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogBook](
	[bookId] [uniqueidentifier] NULL,
	[title] [nvarchar](255) NULL,
	[image] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[bookContent] [nvarchar](max) NULL,
	[publisher] [nvarchar](50) NULL,
	[author] [nvarchar](50) NULL,
	[yearPublic] [varchar](20) NULL,
	[logBookId] [int] IDENTITY(1,1) NOT NULL,
	[updateDate] [datetime] NULL,
	[process] [varchar](max) NULL,
	[flag] [varchar](1) NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[logBookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogMagazine]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogMagazine](
	[magazineId] [uniqueidentifier] NULL,
	[title] [nvarchar](255) NULL,
	[image] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[magazineContent] [nvarchar](max) NULL,
	[logMagazineId] [int] IDENTITY(1,1) NOT NULL,
	[updateDate] [datetime] NULL,
	[process] [varchar](max) NULL,
	[flag] [varchar](1) NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[logMagazineId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogMusic]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogMusic](
	[musicId] [uniqueidentifier] NULL,
	[title] [nvarchar](255) NULL,
	[author] [nvarchar](50) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[imageLink] [varchar](max) NULL,
	[audioLink] [varchar](max) NULL,
	[logMusicId] [int] IDENTITY(1,1) NOT NULL,
	[updateDate] [datetime] NULL,
	[process] [varchar](max) NULL,
	[flag] [varchar](1) NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[logMusicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogSlideShow]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogSlideShow](
	[slideShowId] [uniqueidentifier] NULL,
	[title] [nvarchar](255) NULL,
	[image] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[slideImage] [nvarchar](max) NULL,
	[logSlideShowId] [int] IDENTITY(1,1) NOT NULL,
	[updateDate] [datetime] NULL,
	[process] [varchar](max) NULL,
	[flag] [varchar](1) NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
	[slideShowTypeId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[logSlideShowId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogSolemnVisit]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogSolemnVisit](
	[visitId] [uniqueidentifier] NULL,
	[name] [nvarchar](50) NULL,
	[portraitImage] [varchar](max) NULL,
	[letterImage] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[logSolemnId] [int] IDENTITY(1,1) NOT NULL,
	[updateDate] [datetime] NULL,
	[process] [varchar](max) NULL,
	[flag] [varchar](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[logSolemnId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogTopic]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogTopic](
	[topicId] [uniqueidentifier] NULL,
	[capture] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[images] [nvarchar](max) NULL,
	[videos] [nvarchar](max) NULL,
	[logTopicId] [int] IDENTITY(1,1) NOT NULL,
	[updateDate] [datetime] NULL,
	[process] [varchar](max) NULL,
	[flag] [varchar](1) NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[logTopicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogVideo]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogVideo](
	[videoId] [uniqueidentifier] NULL,
	[title] [nvarchar](255) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[imageLink] [varchar](max) NULL,
	[videoLink] [varchar](max) NULL,
	[logVideoId] [int] IDENTITY(1,1) NOT NULL,
	[updateDate] [datetime] NULL,
	[process] [varchar](max) NULL,
	[flag] [varchar](1) NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[logVideoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Magazine]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Magazine](
	[magazineId] [uniqueidentifier] NOT NULL,
	[title] [nvarchar](255) NULL,
	[image] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[magazineContent] [nvarchar](max) NULL,
	[isDeleted] [bit] NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[magazineId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MediaType]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MediaType](
	[mediaTypeId] [int] NOT NULL,
	[typeName] [nvarchar](50) NULL,
	[typeDescription] [nvarchar](1000) NULL,
 CONSTRAINT [PK_MediaType] PRIMARY KEY CLUSTERED 
(
	[mediaTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Music]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Music](
	[musicId] [uniqueidentifier] NOT NULL,
	[title] [nvarchar](255) NULL,
	[author] [nvarchar](50) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[imageLink] [varchar](max) NULL,
	[audioLink] [varchar](max) NULL,
	[isDeleted] [bit] NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[musicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[role_id] [int] NOT NULL,
	[role_name] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SlideShow]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SlideShow](
	[slideShowId] [uniqueidentifier] NOT NULL,
	[title] [nvarchar](255) NULL,
	[image] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[slideImage] [nvarchar](max) NULL,
	[isDeleted] [bit] NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
	[slideShowTypeId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[slideShowId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SlideShowType]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SlideShowType](
	[slideShowTypeId] [int] NOT NULL,
	[typeName] [nvarchar](50) NULL,
	[typeDescription] [nvarchar](1000) NULL,
 CONSTRAINT [PK_SlideShowType] PRIMARY KEY CLUSTERED 
(
	[slideShowTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SolemnVisit]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SolemnVisit](
	[visitId] [uniqueidentifier] NOT NULL,
	[name] [nvarchar](100) NULL,
	[portraitImage] [varchar](max) NULL,
	[letterImage] [varchar](max) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[isDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[visitId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Topic]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Topic](
	[topicId] [uniqueidentifier] NOT NULL,
	[capture] [nvarchar](max) NULL,
	[createDate] [datetime] NULL,
	[isDeleted] [bit] NULL,
	[images] [nvarchar](max) NULL,
	[videos] [nvarchar](max) NULL,
	[userId] [uniqueidentifier] NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[topicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[userId] [uniqueidentifier] NOT NULL,
	[name] [nvarchar](30) NULL,
	[email] [varchar](40) NULL,
	[accountId] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Video]    Script Date: 3/23/2025 10:34:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Video](
	[videoId] [uniqueidentifier] NOT NULL,
	[title] [nvarchar](255) NULL,
	[createDate] [datetime] NULL,
	[userId] [uniqueidentifier] NULL,
	[imageLink] [varchar](max) NULL,
	[videoLink] [varchar](max) NULL,
	[isDeleted] [bit] NULL,
	[mediaTypeId] [int] NULL,
	[Description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[videoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Account] ([accountId], [username], [password], [hide], [passwordResetToken], [tokenExpiration], [role_id]) VALUES (N'450134b6-1b7f-4987-83b8-67d247ec52ef', N'marrymarry', N'marry456789', 0, NULL, NULL, 2)
INSERT [dbo].[Account] ([accountId], [username], [password], [hide], [passwordResetToken], [tokenExpiration], [role_id]) VALUES (N'8a11cdc9-b8f2-49ad-bda2-abc3f566213e', N'bobdann', N'bobdan753159', 0, NULL, NULL, 2)
INSERT [dbo].[Account] ([accountId], [username], [password], [hide], [passwordResetToken], [tokenExpiration], [role_id]) VALUES (N'964d296d-09e0-4879-882d-b2fdef0a7b56', N'jakejohn', N'jake123456', 0, NULL, NULL, 1)
GO
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'1d538767-7df7-40fe-9e1e-3983b2e8fdd9', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'TIỂU SỬ CUỘC ĐỜI VÀ SỰ NGHIỆP CỦA CHỦ TỊCH TÔN ĐỨC THẮNG', N'<div class="mt-5"><div style="padding-top:50px;padding-bottom:50px;padding-right:30px;background-color:#fff" class="d-flex flex-wrap"><div class="col-lg-4 col-md-4 col-sm-4"><img style="width:100%;height:490px;object-fit:contain" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742394134/KLN/blog/wbznl7cdxyfmmg7gjf4j.jpg" alt="Ảnh Bác Tôn năm 18 tuổi"><p class="text-center mb-0"><strong>Ảnh Bác Tôn năm 18 tuổi.</strong></p></div><div class="col-lg-8 col-md-8 col-sm-8"><p><strong>Họ và tên:</strong>&nbsp; Tôn Đức Thắng.</p><p><strong>Ngày sinh:</strong>&nbsp; 20-8-1888.</p><p><strong>Quê quán:</strong>&nbsp; Làng An Hòa, Tổng Định Thành, Tỉnh Long Xuyên (nay là Xã Mỹ Hòa Hưng, Thành phố Long Xuyên, Tỉnh An Giang).</p><p><strong>Ngày mất:</strong>&nbsp; 30-3-1980 tại Hà Nội.</p><p>Thuở nhỏ học ở trường quê nhà.</p></div></div><div class="d-flex flex-wrap justify-content-center"><div class="col-lg-6 col-md-6 col-sm-6 p-5"><p>Năm 1907 học nghề ở trường Bá nghệ (tức Trường Kỹ nghệ) Sài Gòn; làm công nhân trong xưởng máy của thực dân Pháp ở Sài Gòn.</p><p>Năm 1912: tổ chức và lãnh đạo cuộc bãi công của học sinh Trường Bá nghệ và công nhân Nhà máy sửa chữa tàu thủy Ba Son.</p><p>Tháng 9-1916: Rời Tổ quốc sang Pháp, làm công nhân quân giới ở quân cảng Toulon (miền Nam nước Pháp), làm thợ máy trên chiến hạm France của hải quân Pháp. Tham gia các cuộc vận động chính trị của giai cấp công nhân trong hàng ngũ lính thủy Pháp.</p><div class=""><img style="width:100%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742395021/KLN/blog/lxqa753vliq9kb9wtwy2.jpg" alt="Ảnh vẽ chiến hạm France"><p class="text-center"><strong>Ảnh vẽ chiến hạm France</strong></p></div><p>Ngày 20-4-1919: tham gia cuộc binh biến, kéo cờ đỏ trên chiến hạm France ở biển Đen để ủng hộ Cách mạng Tháng Mười, bảo vệ Nhà nước Xô viết, Nhà nước, Nhà nước công nông đầu tiên trên thế giới, phản đối sự can thiệp vũ trang của bọn đế quốc đối với Nhà nước Xô viết non trẻ.</p><p>Cuối năm 1919: Bị trục xuất khỏi nước Pháp; trở về Sài Gòn làm công nhân cho Hãng Kroff.</p><p>Năm 1920: lập công hội bí mật ở Sài Gòn. Đây là tổ chức công hội bí mật đầu tiên của giai cấp công nhân Việt Nam.</p><p>Tháng 8-1925: tổ chức và lãnh đạo cuộc đấu tranh của công nhân Ba Son. Cuộc đấu tranh này đã đánh dấu sự trưởng thành của phong trào công nhân từ “tự phát” sang “tự giác”.</p><p>Năm 1927: tham gia Hội Việt Nam Cách mạng Thanh niên, được cử vào Ban Chấp hành Kỳ bộ Nam kỳ và Bí thư Thành bộ Sài Gòn – Chợ Lớn.</p><p>Tháng 7-1929: Bị thực dân Pháp bắt ở Sài Gòn.</p><p>Ngày 25-6-1930: bị Tòa đại hình của Pháp kết án 20 năm tù khổ sai.</p><p>Ngày 3-7-1930: bị thực dân Pháp đày ra giam cầm ở Côn Đảo.</p><div class=""><img style="width:100%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742395247/KLN/blog/ckudbyadcveyiqgdxahb.jpg" alt="Ảnh tòa đại hình người thứ 2 trong ảnh là Bác Tôn"><p class="text-center"><strong>Ảnh tòa đại hình người thứ 2 trong ảnh là Bác Tôn</strong></p></div><p>Đầu năm 1932: cùng các đồng chí Nguyễn Hới, Tống Văn Trân, Tạ Uyên… thành lập chi bộ Đảng đầu tiên tại Nhà tù Côn Đảo.</p><p>Ngày 23-9-1945: được Chính phủ Cách mạng đón về, tham gia cuộc kháng chiến chống thực dân Pháp ở Nam Bộ.</p><p>Ngày 25-10-1945: tham dự Hội nghị Xứ ủy Nam kỳ mở rộng, được bầu vào Xứ ủy.</p><p>Ngày 6-1-1946: được bầu vào Quốc hội khóa đầu tiên của nước Việt Nam Dân chủ Cộng hòa.</p><p>Tháng 2-1946: được điều động ra Hà Nội, lần đầu tiên gặp Chủ tịch Hồ Chí Minh.</p><p>Tháng 4-1946: tham gia đoàn đại biểu Quốc hội nước ta sang thăm Pháp.</p><p>Tháng 5-1946: là Phó Hội trưởng Hội Liên hiệp Quốc dân Việt Nam (gọi tắt là Hội Liên Việt).</p><p>Tháng 4-1947: là Bộ trưởng Bộ Nội Vụ.</p><p>Tháng 1-1948: được bầu bổ sung vào Ban Chấp hành Trung ương; được cử làm Trưởng ban vận động thi đua ái quốc Trung ương.</p><p>Tháng 5-1950: được bầu làm Chủ tịch Hội hữu nghị Việt - Xô.</p><p>Tháng 2-1951: được Đại hội Đại biểu toàn quốc lần thứ II của Đảng bầu vào Ban Chấp hành Trung ương.</p><p>Tháng 3-1951: làm Chủ tịch Mặt trận Liên - Việt.</p><p>Tháng 9-1955: được bầu làm Trưởng ban Thường trực Quốc hội.</p><p>Từ tháng 9-1955 đến tháng 2-1977: là Chủ tịch Ủy ban Trung ương Mặt trận Tổ Quốc Việt Nam.</p><p>Tháng 7-1955: là Chủ tịch danh dự của Ủy ban bảo vệ Hòa bình thế giới của Việt Nam và Ủy viên Hội đồng Hòa bình thế giới.</p><p>Năm 1955: Là người Việt Nam đầu tiên được Ủy ban Giải thưởng hòa bình quốc tế Xtalin (giải thưởng này sau đó mang tên Lênin) tặng thưởng Xtalin “Về sự nghiệp củng cố hòa bình và tình hữu nghị giữa các dân tộc”.</p><p>Tháng 2-1957: là Trưởng ban Ban chỉ đạo thanh toán nạn mù chữ Trung ương.</p><p>Năm 1958: là người đầu tiên được Đảng, Nhà nước tặng thưởng Huân chương Sao Vàng, Huân chương cao quý nhất của Nhà nước ta.</p><div class=""><img style="width:100%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742395443/KLN/blog/svgllne309yy3dxcxmal.jpg" alt="Ảnh Bác Hồ trao huân chương Sao Vàng cho Bác Tôn"><p class="text-center"><strong>Ảnh Bác Hồ trao huân chương Sao Vàng cho Bác Tôn</strong></p></div></div><div class="col-lg-6 col-md-6 col-sm-6 p-5"><p>Từ 15-7-1960: được cử giữ chức Phó Chủ tịch nước Việt Nam Dân chủ Cộng hòa.</p><div class=""><img style="width:100%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742395500/KLN/blog/eoac9qr4kju1658xjoaw.jpg" alt="Ảnh Bác Hồ chúc mừng Bác Tôn giữ chức Phó Chủ tịch Nước"><p class="text-center"><strong>Ảnh Bác Hồ chúc mừng Bác Tôn giữ chức Phó Chủ tịch Nước</strong></p></div><p>Ngày 23-9-1969: được cử giữ chức Chủ tịch nước, kế tục Chủ tịch Hồ Chí Minh vừa từ trần, và giữ chức vụ này cho đến khi qua đời.</p><p>Ngày 23-9-1969: được cử giữ chức Chủ tịch nước, kế tục Chủ tịch Hồ Chí Minh vừa từ trần, và giữ chức vụ này cho đến khi qua đời.</p><div class=""><img style="width:100%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742395588/KLN/blog/otxf5rbkkynappwnu9ot.jpg" alt="Ảnh chân dung Chủ tịch Tôn Đức Thắng (1888 - 1980)"><p class="text-center"><strong>Ảnh chân dung Chủ tịch Tôn Đức Thắng (1888 - 1980)</strong></p></div><p>Từ tháng 1-1948 đến 1980: là Ủy viên Ban Chấp hành Trung ương Đảng các khóa I (bầu bổ sung), II, III, IV.</p><p>Từ tháng 1946 đến 1980: là Đại biểu Quốc hội các khóa I, II, III, IV,V, VI.</p><p>Năm 1967: Đoàn Chủ tịch Xô viết tối cao Liên Xô tặng thưởng Huân chương Lênin.</p><p>Ngày 30-3-1980: Bác Tôn qua đời tại Hà Nội, an táng tại nghĩa trang Mai Dịch, hưởng thọ 92 tuổi.</p><p>Từ tháng 1-1948 đến 1980: là Ủy viên Ban Chấp hành Trung ương Đảng các khóa I (bầu bổ sung), II, III, IV.</p><p>Từ tháng 1946 đến 1980: là Đại biểu Quốc hội các khóa I, II, III, IV,V, VI.</p><p>Năm 1967: Đoàn Chủ tịch Xô viết tối cao Liên Xô tặng thưởng Huân chương Lênin.</p><p>Ngày 30-3-1980: Bác Tôn qua đời tại Hà Nội, an táng tại nghĩa trang Mai Dịch, hưởng thọ 92 tuổi.</p><div class=""><img style="width:100%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742395713/KLN/blog/u7oagqgtzda3yvw3bz3u.jpg" alt="Tang lễ Chủ tịch Tôn Đức Thắng"><p class="text-center"><strong>Tang lễ Chủ tịch Tôn Đức Thắng</strong></p></div></div></div></div>', CAST(N'2025-03-13T16:12:54.690' AS DateTime), N'd3bf776b-d5f7-4662-90d2-c273bfb779d2', 0, 2, NULL)
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'389b9e23-5201-4b30-ae59-5212fa5eb0f4', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'KHU LƯU NIỆM CHỦ TỊCH TÔN ĐỨC THẮNG', N'<div class=""><p style="margin-bottom:5px">- Di tích lịch sử Khu lưu niệm Chủ tịch Tôn Đức Thắng tại Mỹ Hòa Hưng (Thành phố Long Xuyên, Tỉnh An Giang)</p><p style="margin-bottom:5px">- Khu di tích lưu niệm Chủ tịch Tôn Đức Thắng nằm ở Cù lao Ông Hổ, giữa sông Hậu, tổ 4, ấp Mỹ An 2, xã Mỹ Hòa Hưng, thành phố Long Xuyên, tỉnh An Giang.</p><p style="margin-bottom:5px">- Khu lưu niệm Chủ tịch Tôn Đức Thắng tại Ấp Mỹ An, Xã Mỹ Hòa Hưng, Tỉnh An Giang được thành lập sau khi Bộ trưởng Bộ Văn hóa - Thông tin (nay là Bộ Văn hóa, Thể thao và Du lịch) quyết định xếp hạng là Di tích lịch sử quốc gia năm 1984. Đây là nơi Bác Tôn đã sinh ra, trưởng thành, là nơi hình thành nhân cách, hun đúc lòng yêu nước, tinh thần đấu tranh cách mạng của người lãnh tụ của nhân dân Nam Bộ nói riêng và nhân dân cả nước nói chung. Khu di tích này rộng khoảng 3.102m2, nằm trong một tổng thể không gian cảnh quan thoáng mát như bao nhiêu làng quê Nam Bộ, bao gồm các hạng mục:</p><div class="d-flex flex-wrap justify-content-center"><img style="width:50%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742486920/KLN/blog/anzaekuzrxbv9vx9cefd.jpg" alt=""></div><p style="margin-bottom:5px">- Ngôi nhà sàn: do ông Tôn Văn Đề, thân sinh Chủ tịch Tôn Đức Thắng, dựng năm 1887, trên nền đất hương hỏa dòng họ Tôn. Năm 1888, Bác Tôn sinh ra tại ngôi nhà này và sống ở đây suốt thời niên thiếu đến khi rời quê lên Sài Gòn học nghề (năm 1906).</p><p style="margin-bottom:5px">- Đây là một kiến trúc vững chắc nhưng hết sức mộc mạc, giản dị, ít chạm trổ cầu kỳ, theo kiểu nhà Nam bộ. Trong ngôi nhà này vẫn còn lưu giữ nhiều hiện vật gốc như: 2 tấm ảnh bán thân của song thân Bác Tôn, một bộ ngựa gõ mà Bác Tôn thường nằm lúc còn niên thiếu, một tủ thờ cẩn ốc xà cừ, các tấm liễn đối cẩn ốc, một tấm ảnh Bác Tôn chụp năm 18 tuổi, một tấm ảnh Bác Tôn chụp ở chiến khu Việt Bắc - lúc Bác đang làm Chủ tịch Mặt trận Liên Việt, gửi về tặng gia đình, phía sau tấm ảnh có ghi những dòng chữ “Kính biếu mẹ già và mấy em, ngày 24-7-1951”, dưới dòng chữ có chữ ký của Bác.</p><p style="margin-bottom:5px">- Khu mộ chí: nằm trong khu vực vườn cây ăn quả, có diện tích nền 110m2, thẳng phía sau nhà sàn, là nơi an nghỉ cuối cùng của hai thân sinh và vợ chồng người em trai thứ tư của Bác Tôn là bác Tôn Đức Nhung.</p><p style="margin-bottom:5px">- Vườn cây: gồm các loại cây, hoa trái tiêu biểu của vùng đất Nam Bộ như: mai, tre xanh, vú sữa, xoài...</p><p style="margin-bottom:5px">- Công trình Kỷ niệm 110 năm ngày sinh Bác Tôn, gồm 03 hạng mục:</p><p style="margin-bottom:5px">+ Đền tưởng niệm Chủ tịch Tôn Đức Thắng;</p><p style="margin-bottom:5px">+ Nhà trưng bày: giới thiệu toàn bộ cuộc đời và sự nghiệp của Bác Tôn;</p><p style="margin-bottom:5px">+ Quảng trường: nằm bên bờ sông Hậu, tổ chức các hoạt động văn hóa, văn nghệ, thể dục thể thao, mít tinh. lễ hội....</p><p style="margin-bottom:5px">- Công trình Kỷ niệm 120 năm ngày sinh Bác Tôn, gồm 07 hạng mục:</p><p style="margin-bottom:5px">+ Nhà làm việc của Bác Tôn;</p><p style="margin-bottom:5px">+ Chiếc Ca nô: mang tên Giải phóng, đây là chiếc ca nô mà Bác Tôn Đức Thắng đã điều khiển, đưa một số đồng chí trong Ban lãnh đạo Đảng và cán bộ cách mạng bị tù Côn Đảo trở về, chấm dứt 15 năm Bác Tôn bị tù đày tại địa ngục Côn Đảo;</p><p style="margin-bottom:5px">+ Máy bay YAK-40 số 452: đã đưa Chủ tịch Tôn Đức Thắng từ Hà Nội vào Sài Gòn ngày 11/5/1975 để dự lễ mít tinh kỷ niệm 30/4/1975;</p><p style="margin-bottom:5px">+ Tàu Giang cảnh: là phương tiện đưa Bác Tôn từ Long Xuyên về thăm quê nhà cù lao Ông Hổ, xã Mỹ Hòa Hưng, tháng 10 năm 1975;</p><p style="margin-bottom:5px">+ Nhà trưng bày các tác phẩm điêu khắc: gồm 23 tác phẩm điêu khắc, bằng gốc cây lâu năm, chủ đề về Bác Tôn và quê hương Mỹ Hòa Hưng.</p><p style="margin-bottom:5px">- Các di vật tiêu biểu trong khu di tích lưu niệm: trong ngôi nhà sàn vẫn lưu giữ 12 hiện vật gốc được gia tộc họ Tôn sử dụng từ khi dựng nhà, tiêu biểu như: bộ ngựa gõ, bộ bàn ghế tiếp khách, tủ thờ, đỉnh trầm, tủ áo...</p><p style="margin-bottom:5px">- Nhà Trưng bày thân thế, sự nghiệp Chủ tịch Tôn Đức Thắng có 36 hiện vật gốc gắn với cuộc đời niên thiếu và sự nghiệp hoạt động cách mạng của Bác Tôn, tiêu biểu như: đôi hài hàm ếch, đồng hồ đeo tay, quần kaki, ... và nhiều hiện vật phục chế khác.</p><p style="margin-bottom:5px">- Khu di tích lưu niệm của Chủ tịch Tôn Đức Thắng là địa điểm lưu niệm danh nhân cách mạng. Tại đây, Bác đã sinh ra, học tập, trưởng thành và chứng kiến đời sống lầm than cơ cực của người dân vùng quê Bác do những áp bức, bóc lột của thực dân và phong kiến, để khi hết tiểu học Bác rời quê lên Sài gòn học nghề và bước vào con đường đấu tranh cách mạng.</p><p style="margin-bottom:5px">- Hiện nay, Khu lưu niệm Bác Tôn đã trở thành một địa điểm lưu niệm quan trọng về Bác, đồng thời là nơi sinh hoạt văn hóa, văn nghệ - thể dục thể thao trong các ngày lễ hội và các ngày lễ lớn của đất nước.... Những hoạt động diễn ra ở đây mang tính chất thường kỳ, có ý nghĩa tuyên truyền, giáo dục truyền thống sâu sắc, nhất là đối với thế hệ trẻ.</p><p style="margin-bottom:5px">- Khu di tích lưu niệm Chủ tịch Tôn Đức Thắng tại Mỹ Hòa Hưng, tỉnh An Giang có giá trị đặc biệt về lịch sử, văn hóa, du lịch. Ngày 10/5/2012, Thủ tướng Chính phủ đã quyết định xếp hạng Khu di tích lưu niệm Chủ tịch Tôn Đức Thắng là di tích quốc gia đặc biệt.</p><p style="margin-bottom:5px">(Theo Hồ sơ xếp hạng di tích, tư liệu Cục Di sản văn hóa)</p></div>', CAST(N'2025-01-14T03:04:50.827' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, 3, NULL)
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'a05f5b61-43c5-455f-8c14-5841bdd61588', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'Blog1', N'Blog1', CAST(N'2025-01-14T03:04:50.827' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, NULL, NULL)
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'576b5d47-8b20-40a3-881a-613b10d4d54f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'Blog2', N'Blog2', CAST(N'2025-01-14T03:04:50.827' AS DateTime), N'c11546db-1ae9-46c3-8f86-3c606c6d67cd', 0, NULL, NULL)
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'de630e87-f026-4c4d-ad66-6a3fa3b05abb', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'BẢO TÀNG CHỦ TỊCH TÔN ĐỨC THẮNG

', N'<p style="margin-bottom:5px">Bảo tàng Tôn Đức Thắng được thành lập nhân kỷ niệm lần thứ 100 ngày sinh Chủ tịch Tôn Đức Thắng (20/8/1888 - 20/8/1988). Bảo tàng ra đời nhằm đáp ứng yêu cầu tìm hiểu, nghiên cứu học tập về Bác Tôn của nhân dân cả nước nói chung, nhân dân miền Nam nói riêng và đặc biệt là nhân dân Thành phố Hồ Chí Minh. Bởi lẽ, Bác Tôn - người con ưu tú của nhân dân Nam bộ, người công nhân ưu tú của giai cấp công nhân và nhân dân lao động Sài Gòn - Chợ Lớn, là tấm gương, niềm tự hào của nhân dân Nam bộ thành đồng. Hơn nữa, Bảo tàng Tôn Đức Thắng đặt tại Thành phố Hồ Chí Minh cũng mang ý nghĩa đặc biệt vì phong trào đấu tranh của công nhân, nhân dân lao động Sài Gòn vào những năm đầu thế kỷ XX khi Đảng Cộng sản Việt Nam chưa ra đời luôn gắn liền với tên tuổi Tôn Đức Thắng - người tham gia sáng lập tổ chức Công hội bí mật.</p><div class="d-flex flex-wrap justify-content-center"><img style="width:50%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742488010/KLN/blog/z3amc8zakmcbohyu88p7.jpg" alt=""></div><p style="margin-bottom:5px">Là bảo tàng lưu niệm danh nhân, Bảo tàng Tôn Đức Thắng là nơi duy nhất trong cả nước giới thiệu khá đầy đủ và có hệ thống về cuộc đời và sự nghiệp Chủ tịch Tôn Đức Thắng thông qua 5 chủ đề chính ở các phòng trưng bày thường trực và 1 phòng trưng bày chuyên đề ngắn hạn. Bảo tàng Tôn Đức Thắng đã và đang góp phần giáo dục truyền thống, bồi dưỡng lý tưởng cho giai cấp công nhân, nâng cao lòng tự hào dân tộc trong quần chúng nhân dân và thế hệ trẻ Việt Nam với niềm ngưỡng mộ, tôn vinh một con người vĩ đại mà bình dị.</p><p style="margin-bottom:5px">Với quá trình nỗ lực, phấn đấu của toàn thể công chức, viên chức đơn vị, sự quan tâm chỉ đạo của các cấp lãnh đạo từ Trung ương, Thành phố Hồ Chí Minh, trực tiếp là Sở Văn hóa và Thể thao, sự giúp đỡ của các cơ quan, ban, ngành, đoàn thể, đặc biệt là các đồng chí lão thành cách mạng và các cộng tác viên thân thiết của Bảo tàng, năm 2012 bảo tàng vinh dự đón nhận Huân chương Lao động hạng II. Đây là phần thưởng cao quý động viên công chức, viên chức bảo tàng phấn đấu hơn nữa trong việc gìn giữ và phát huy di sản văn hóa Chủ tịch Tôn Đức Thắng.</p><p style="margin-bottom:5px">Địa chỉ: Số 5, Đường Tôn Đức Thắng, Phường Bến Nghé, Quận 1, Tp. Hồ Chí Minh</p><p style="margin-bottom:5px">Điện thoại: (08) 38297542 ; Fax: (848) 38294651;</p><p style="margin-bottom:5px">Email: baotangtonducthang@gmail.com</p><p style="margin-bottom:5px">(Trích:<a href="http://www.baotangtonducthang.com/">http://www.baotangtonducthang.com/</a>)</p>', CAST(N'2025-01-14T03:04:50.827' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, 3, NULL)
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'd143ab30-a8f4-4bf5-8506-83131973d1de', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'TRƯỜNG CHÍNH TRỊ TÔN ĐỨC THẮNG

', N'<p style="margin-bottom:5px">Thành lập năm 1948 với tên gọi: Trường Đảng Long Châu Hậu, đến nay là Trường chính trị Tôn Đức Thắng.</p><p style="margin-bottom:5px">Trường chính trị Tôn Đức Thắng chịu sự lãnh đạo, quản lý của Tỉnh ủy và UBND tỉnh, đồng thời chịu sự chỉ đạo, hướng dẫn và kiểm tra về chuyên môn, nghiệp vụ của Học viện Chính trị - Hành chính quốc gia Hồ Chí Minh.</p><div class="d-flex flex-wrap justify-content-center"><img style="width:50%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742488364/KLN/blog/x58vclwnlbl6cbt9o8ul.jpg" alt=""></div><p style="margin-bottom:5px">Phương châm thực hiện của trường hiện nay: “Trách nhiệm, thân thiện, chuẩn mực, đổi mới, chất lượng”.</p><p style="margin-bottom:5px">Trường chính trị Tôn Đức Thắng là đơn vị sự nghiệp công lập trực thuộc Tỉnh ủy và Ủy ban nhân dân (UBND) tỉnh, tổ chức bộ máy gồm Ban Giám hiệu, 04 khoa, 03 phòng.</p><p style="margin-bottom:5px">Đào tạo, bồi dưỡng cán bộ lãnh đạo, quản lý của Đảng, chính quyền, đoàn thể nhân dân cấp cơ sở (xã, phường, thị trấn và các đơn vị tương đương); trưởng, phó phòng, ban, ngành, đoàn thể cấp huyện và tương đương; trưởng, phó phòng của sở, ban, ngành, đoàn thể cấp tỉnh và tương đương; cán bộ dự nguồn các chức danh trên; cán bộ, công chức cấp cơ sở và một số đối tượng khác về chủ nghĩa Mác-Lênin, tư tưởng Hồ Chí Minh; về đường lối của Đảng, chính sách và pháp luật của Nhà nước; về nghị quyết, chỉ thị của Đảng và Nhà nước và một số lĩnh vực khác.</p><p style="margin-bottom:5px">- Đào tạo trung cấp lý luận chính trị - hành chính cho các cán bộ lãnh đạo, quản lý của hệ thống chính trị cấp cơ sở; cán bộ, công chức, viên chức ở địa phương.</p><p style="margin-bottom:5px">- Bồi dưỡng, cập nhật kiến thức, kỹ năng lãnh đạo, chuyên môn, nghiệp vụ cho các chức danh cán bộ lãnh đạo, quản lý; cán bộ chuyên môn, nghiệp vụ của các tổ chức Đảng, chính quyền, đoàn thể nhân dân cấp cơ sở.</p><p style="margin-bottom:5px">- Bồi dưỡng, cập nhật kiến thức cho đại biểu hội đồng nhân dân cấp xã, cấp huyện.</p><p style="margin-bottom:5px">- Đào tạo tiền công vụ đối với công chức dự bị; bồi dưỡng chuyên viên và các chức danh tương đương.</p><p style="margin-bottom:5px">- Phối hợp với Ban Tuyên giáo Tỉnh ủy hướng dẫn và bồi dưỡng nghiệp vụ, phương pháp giảng dạy cho đội ngũ giảng viên của trung tâm bồi dưỡng chính trị cấp huyện.</p><p style="margin-bottom:5px">- Tổ chức nghiên cứu khoa học phục vụ giảng dạy, học tập và tổng kết kinh nghiệm thực tiễn ở địa phương, cơ sở.</p><p style="margin-bottom:5px">- Mở các lớp đào tạo, bồi dưỡng ngoài các đối tượng đã nêu trên theo chỉ đạo của Thường trực Tỉnh ủy và Thường trực UBND tỉnh.</p><p style="margin-bottom:5px">- Trường chính trị Tôn Đức Thắng có tư cách pháp nhân, có con dấu và tài khoản riêng; chịu sự chỉ đạo, quản lý về tổ chức, biên chế và hoạt động của Tỉnh ủy, UBND tỉnh; đồng thời chịu sự chỉ đạo, hướng dẫn, thanh tra, kiểm tra về chuyên môn, nghiệp vụ của Học viện Chính trị - Hành chính quốc gia Hồ Chí Minh.</p><p style="margin-bottom:5px">Địa chỉ liên hệ:</p><p style="margin-bottom:5px">- Trụ sở: Số 53/9 đường Trần Hưng Đạo, phường Mỹ Thạnh, Thành phố Long Xuyên, tỉnh An Giang.</p><p style="margin-bottom:5px">- Điện thoại: (076) 3 831388</p><p style="margin-bottom:5px">- Fax : (076) 3 831211</p><p style="margin-bottom:5px">- E.mail : truongchinhtri@angiang.gov.vn</p><p style="margin-bottom:5px">(Trích:<a href="http://truongchinhtri.angiang.gov.vn">http://truongchinhtri.angiang.gov.vn</a>)</p>', CAST(N'2025-01-14T03:04:50.827' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, 3, NULL)
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'c0690c67-60af-4a0c-9345-89efa9955ad9', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1741970860/KLN/blog/wmwhqwlpciysuwrdzg2z.png', N'ĐỀN TƯỞNG NIỆM CHỦ TỊCH TÔN ĐỨC THẮNG', N'<div style="display:flex;flex-wrap:wrap;padding:0 60px;margin-top:50px"><p style="font-size:21px">Ngôi đền được khởi công xây dựng vào ngày 21 tháng 5 năm 1997 và hoàn thành ngày 30 tháng 7 năm 1998, khánh thành vào 20/08/1998 nhân kỷ niệm tròn 110 năm ngày sinh Bác Tôn.<br>Đền tưởng niệm được xây cất theo kiến trúc đền đài cổ Việt Nam pha lẫn nét đặc thù của đồng bằng Nam Bộ.<br><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741612227/KLN/blog/eu0ckur4pq9mznletiiz.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px">Đền tưởng niệm chủ tịch Tôn Đức Thắng</p><p style="font-size:21px">Diện tích tổng thể của ngôi đền 1600m<sup>2</sup>riêng phần chính diện 110m<sup>2</sup>. Con số 110 ở đây các nhà thiết kế xây dựng muốn đánh dấu sự thành công và lòng tôn kính của mình đối với vị lãnh tụ nhân kỷ niệm ngày sinh của người.</p><p style="font-size:21px">Trên nóc đền với hai tầng mái ngói uống cong duyên dáng mang nhiều âm hưởng kiến trúc truyền thống đồng bằng Sông Hồng. Mái lợp ngói đại ống loại ngói phổ biến dùng cho các chùa triền Nam bộ. Bờ dãi và đầu đao được đắp nổi các tượng Rồng con vật truyền thống luôn gắn bó chặt chẽ với đời sống tâm linh của người việt. Trước khi vào đền quí khách bước qua hai cấp bậc hành lang, bật thứ nhất có 9 cấp, bậc thứ nhì có 7 cấp. Chín và bảy ở đây tượng trưng cho quy luật âm dương hòa quyện thể hiện cuộc sống thanh bình.</p><p style="font-size:21px">Về phần trang trí nội thất: Bên trong ngôi đền chính giữa là bao lam, bao lam ở đây gồm ba mảng trạm khắc ghép thành. Mỗi mảng gồm hai phần chính, phần dìm đỡ bên dưới và phần vách trạm bên trên. Phần diềm đỡ bên dưới được trạm hình hai con rồng đang chầu vào cuốn thư. Trên cuốn thư là tên của chủ tịch: Tôn Đức thắng được viết theo lối chữ giả cổ, phía dưới hai con rồng là hình trạm những thanh tre to chắc vương cao, thể hiện ý chí kiên cường trung dũng bất khuất của Bác. Ở dưới là bộ cá hóa long đỡ lấy toàn bộ bao lam. Phần vách trạm bên trên người dân thường gọi là thành vọng. Gồm nhiều tấm trạm nhỏ ghép thành với các loài hoa: hoa sen, hoa cúc, hoa mai, trên cùng là hoa lan. Các loại hoa thể hiện tính cách thanh cao trong sáng của Bác. Nơi quí khách đang đứng là phần chính điện của ngôi đền, chính điện thờ tượng bán thân đúc đồng của chủ tịch TÔN ĐỨC THẮNG tượng nặng 310 kg. Phía sau là bức phong sơn mài màu son đỏ, phía trên bức phong sơn mài được đắp nổi hình tượng chiếc trống đồng ngọc lũ hồn thiêng sông núi Việt Nam.</p><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741612227/KLN/blog/f2sscbonqsekc1q1d09o.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px">Trang trí bên trong đền tưởng niệm chủ tịch Tôn Đức Thắng</p></div></div></p></div>', CAST(N'2025-03-10T12:23:11.577' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, 1, N'Diện tích tổng thể của ngôi đền 1600m2 riêng phần chính diện 110 m2. Con số 110 ở đây các nhà thiết kế xây dựng muốn đánh dấu sự thành công và lòng tôn kính của mình đối với vị lãnh tụ nhân kỷ niệm ngày sinh của người.')
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'c20ca0d3-fb26-4ac3-b264-9e527b92196f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1741971146/KLN/blog/fugumloabdouanpehswb.png', N'KHU MỘ CHÍ', N'<div style="display:flex;flex-wrap:wrap;padding:0 60px;margin-top:50px"><p style="font-size:21px">Phía sau ngôi nhà 50m là khu mộ của gia đình. Mộ cụ ông Tôn Văn Đề, cụ bà Nguyễn Thị Dị, kề bên là hai vợ chồng em trai thứ tư của BácTôn đó là Bác Tôn Đức Nhung vợ Bác Nhung Bà Nguyễn Thị Từ.</p><p style="font-size:21px">Khu mộ này trước đây được đắp xi măng. Sau có tô thêm phần đá rửa, khi được công nhận là di tích lịch sử văn hóa cấp quốc gia thì khu mộ của gia đình đã được tráng và tô cao thêm phần nền, đồng thời cũng xây đường đi từ khu mộ đến Ngôi nhà lưu niệm cho gia đình và khách tham quan tiện việc viếng thăm. Không khí miền quê trong lành và yên ả nên người dân ở đây sống rất thọ, khi nhìn vào bia mộ quý khách sẽ thấy rõ điều đó như cụ ông hưởng thọ 74 tuổi, cụ bà hưởng thọ 80 tuổi và Bác Nhung thọ 90 tuổi vợ Bác Nhung 89 tuổi và Bác Tôn có lẽ cũng được hưởng sự di truyền đó nên thọ 92 tuổi.</p><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741612551/KLN/blog/scn2xvse7wceud28r4u2.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px">Khu mộ chí</p></div></div>', CAST(N'2025-03-10T12:23:11.577' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, 1, N'Khu mộ này trước đây được đắp xi măng. Sau có tô thêm phần đá rửa, khi được công nhận là di tích lịch sử văn hóa cấp quốc gia thì khu mộ của gia đình đã được tráng và tô cao thêm phần nền, đồng thời cũng xây đường đi từ khu mộ')
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'7f9b9130-28e9-4dc3-94e9-afb4939bb095', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'ĐẠI HỌC TÔN ĐỨC THẮNG', N'<p style="margin-bottom:5px">Đại học Tôn Đức Thắng (TDTU) là đại học công lập thuộc Tổng Liên đoàn Lao động Việt Nam; thành lập ngày 24/9/1997; đến nay TDTU đã trở thành đại học Top 2 của Việt Nam và đang trên đường xác lập vị trí trong danh sách các đại học tốt nhất Châu Á.</p><div style="display:flex;justify-content:center;margin:10px 0"><img src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742060202/KLN/blog/ldfw4sjiwybkfcdfr9dm.png" alt=""></div><p style="margin-bottom:5px">Thông điệp TDTU về phương châm hành động của toàn thể giảng viên, viên chức và sinh viên Đại học Tôn Đức Thắng là:</p><p style="margin-bottom:5px">- Không gì quan trọng hơn việc bảo đảm HIỆU QUẢ trong mọi hành động.</p><p style="margin-bottom:5px">- Không gì đáng quý hơn sự CÔNG BẰNG trong mọi ứng xử.</p><p style="margin-bottom:5px">- Không có gì đạo đức hơn TINH THẦN PHỤNG SỰ đất nước.</p><p style="margin-bottom:5px">Tiền thân của Đại học Tôn Đức Thắng là Trường đại học công nghệ dân lập Tôn Đức Thắng, thành lập theo Quyết định 787/TTg-QĐ ngày 24/9/1997 của Thủ tướng Chính phủ. Trường do Liên đoàn Lao động thành phố Hồ Chí Minh sáng lập và quản lý thông qua Hội đồng quản trị Nhà trường do Chủ tịch Liên đoàn Lao động Thành phố đương nhiệm lúc đó làm Chủ tịch.</p><p style="margin-bottom:5px">Mục tiêu thành lập Trường trong giai đoạn đầu là: thực hiện Chương trình 17/TU và Chỉ thị 13 của Thành ủy Thành phố Hồ Chí Minh về đào tạo, đào tạo lại, bồi dưỡng và nâng cao trình độ chuyên môn, tay nghề cho giai cấp công nhân Thành phố; phát triển nguồn nhân lực cho nhu cầu công nghiệp hoá - hiện đại hoá; góp phần đào tạo nhân tài, nhân lực, thực hiện nghiên cứu để phục vụ hệ thống sản xuất, xã hội ở Thành phố Hồ Chí Minh và các tỉnh phía Nam.</p><p style="margin-bottom:5px">Với sự phát triển nhanh chóng về mọi mặt, để Trường có pháp nhân phù hợp bản chất thực (là trường công và hoàn toàn không có yếu tố tư nhân); ngày 28/01/2003, Thủ tướng Chính phủ ra Quyết định số 18/2003/TTg-QĐ chuyển đổi pháp nhân và đổi tên Trường thành Trường đại học bán công Tôn Đức Thắng, trực thuộc Ủy ban nhân dân Thành phố Hồ Chí Minh. Như vậy, sau 5 năm rưỡi hoạt động dưới pháp nhân dân lập và đào tạo thiên về khối công nghệ-kỹ thuật; bằng quyết định này, Trường chính thức trở thành đại học đa ngành và không còn là trường dân lập nữa. Ngày 11/6/2008, Thủ tướng Chính phủ một lần nữa ra Quyết định số 747/TTg-QĐ đổi tên Trường đại học bán công Tôn Đức Thắng thành Trường đại học Tôn Đức Thắng và chuyển về thuộc Tổng Liên đoàn Lao động Việt Nam. Cùng trong thời gian này, mục tiêu của Trường được xác định thêm là trực tiếp phục vụ việc phát triển nguồn nhân lực trong công nhân, người lao động để góp phần xây dựng giai cấp công nhân Việt Nam trong Nghị quyết 20-NQ/TW ngày 28/01/2008 của Hội nghị Lần thứ 6 Ban chấp hành trung ương Đảng Khóa 10.</p><p style="margin-bottom:5px">Đến ngày 29/01/2015, tại Quyết định số 158/QĐ-TTg, Thủ tướng Chính phủ phê duyệt Đề án thí điểm đổi mới cơ chế hoạt động của Trường đại học Tôn Đức Thắng giai đoạn 2015-2017; mục tiêu của Đại học Tôn Đức Thắng được xác định rằng: “Đại học Tôn Đức Thắng chủ động huy động, sử dụng hợp lý, hiệu quả nhất các nguồn lực của Trường và xã hội (không sử dụng vốn ngân sách nhà nước) để phát triển Trường đại học Tôn Đức Thắng thành một trường đại học định hướng nghiên cứu có chất lượng ở trong khu vực và trên thế giới; đồng thời bảo đảm các đối tượng chính sách, đối tượng thuộc hộ nghèo có cơ hội tiếp cận các chương trình đào tạo của Trường”.</p><p style="margin-bottom:5px">Như vậy, trong 20 năm qua, theo nhu cầu phát triển của đất nước và sự tăng trưởng nhanh chóng của Nhà trường, mục tiêu thành lập Trường đã được điều chỉnh 2 lần; và Đại học Tôn Đức Thắng trong 20 năm kế tiếp có nhiệm vụ trở thành một đại học nghiên cứu thuộc TOP 60 trường đại học tốt nhất Châu Á cũng như trở thành một đại học hàng đầu trong TOP 500 trường đại học tốt nhất thế giới. Martin Luther từng nói: “Khi trường học phát triển, mọi thứ đều phát triển theo”. Đại học Tôn Đức Thắng sẽ trở thành đại học số 1 Việt Nam để phụng sự tốt nhất cho đất nước, nhân dân Việt Nam; cũng như sự phát triển ổn định, bền vững và hòa bình của thế giới</p><p style="margin-bottom:5px">Xem thêm chi tiết tại Website:<a target="_blank" rel="noreferrer" href="http://www.tdtu.edu.vn/">http://www.tdtu.edu.vn/</a></p>', CAST(N'2025-03-15T17:44:33.447' AS DateTime), N'd3bf776b-d5f7-4662-90d2-c273bfb779d2', 0, 3, NULL)
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'911ef862-3f21-432c-a84c-dadad7c3a6fc', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1741970860/KLN/blog/to8pgph5elrpxvpjxei5.png', N'TRƯNG BÀY CHUYÊN ĐỀ "15 NĂM TÙ CÔN ĐẢO"', N'<div style="display:flex;flex-wrap:wrap;padding:0 60px;margin-top:50px"><p style="font-size:21px;margin-bottom:30px">Trưng bày chuyên đề "15 năm tù Côn Đảo” đây là nơi giới thiệu những hình ảnh, tư liệu và hiện vật về quá trình hình thành nhà tù Côn Đảo, phản ánh sinh động, chân thực về địa ngục trần gian mà những chiến sĩ cộng sản ta phải trải qua, đặc biệt là khoảng thời gian 15 năm Bác Tôn bị lưu đày ở địa ngục trần gian Côn Đảo.</p><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741610601/KLN/blog/bhmpkzowfno0vi5jevdz.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px;margin-bottom:50px">Chuyên đề "15 năm tù Côn Đảo”</p><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741610601/KLN/blog/u9eumhzo0gjycyrulc6i.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px;margin-bottom:50px">Chuyên đề "15 năm tù Côn Đảo”</p></div></div>', CAST(N'2025-03-10T12:23:11.577' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, 1, N'Trưng bày chuyên đề 15 năm tù Côn Đảo” đây là nơi giới thiệu những hình ảnh, tư liệu và hiện vật về quá trình hình thành nhà tù Côn Đảo, phản ánh sinh động, chân thực về địa ngục trần gian mà những chiến sĩ cộng sản ta phải trải qua, đặc biệt là khoảng thời gian 15 năm Bác Tôn bị lưu đày ở địa ngục trần gian Côn Đảo.

')
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'4ead35bb-e03f-4c10-8d49-e87b1d1a5315', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1741970859/KLN/blog/b5yvapklvfvcbosqoqg1.png', N'NHÀ SÀN THỜI NIÊN THIẾU (1888-1906)', N'<div style="display:flex;flex-wrap:wrap;padding:0 60px;margin-top:50px"><p style="font-size:21px">Ngôi nhà lưu niệm thời niên thiếu Chủ Tịch Tôn Đức Thắng được xây dựng vào năm 1887. Nhà được xây theo kiểu nhà sàn Nam bộ ba gian, 2 chái bát dần. Toàn bộ loại gỗ sử dụng trong nhà là gỗ thao lao, riêng bộ cột làm bằng gỗ tràm. Mái lợp ngói đại ống hay còn gọi là ngói âm dương. Tổng diện tích ngôi nhà là 156m<sup>2</sup>.</p><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741611361/KLN/blog/afuzbr1td4rnezz9vdrh.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px">Ngôi nhà lưu niệm thời niên thiếu Chủ Tịch Tôn Đức Thắng</p><p style="font-size:21px">Về phần trang trí bên trong: chính giữa là bàn thờ ông bà, hai bên là phòng ngủ. Phòng ngủ bên phải là giường ngủ của hai vợ chồng Bác Tư Nhung, phía trước phòng ngủ là hai tủ đứng. Tủ bên trái tủ kiếng do song thân Bác sử dụng, tủ bên phải do bác mua về tặng cha mẹ khi học nghề ở sài Gòn. Phía trên là hai bức ảnh song thân cụ ông Tôn Văn Đề và cụ bà Nguyễn Thị Dị. Phía dưới là ảnh hai vợ chồng em trai thứ tư: Bác Tôn Đức Nhung và em dâu là bà Nguyễn Thị Từ. Chính ngôi nhà này ngày 20 tháng 8 năm 1888 cậu bé Tôn Đức Thắng đã cất tiếng khóc chào đời, và sống những tháng ngày thơ ấu. Ngôi nhà này đã từng chứng kiến nhiều cảnh vui mừng tương hội giữa Bác và gia đình trong những tháng năm dài bác xa quê hương đi làm cách mạng. Đó là những lần Bác lập gia đình vào năm 1920, sau ngày CMT8 thành công 1945 và sau đại thắng mùa xuân 1975 cả gia đình Bác đã về đây thăm lại gia đình và quê hương mặc dù cha mẹ không còn, anh em người còn người mất nhưng nỗi vui mừng khao khát của người con sau 30 năm xa xứ làm xao động cả xóm làng cù lao Ông Hổ.</p><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741611361/KLN/blog/t7w2aatqpfnxfqhzgj3u.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px">Trang trí bên trong ngôi nhà lưu niệm thời niên thiếu Chủ Tịch Tôn Đức Thắng</p><p style="font-size:21px">Hàng ba trước đây là nền đất nên có ba bộ ngựa ở phía trước, nhưng hiện nay chỉ còn một bộ ngựa gỗ mà bác Tôn thường hay nằm nghỉ ngơi khi có dịp về thăm nhà lúc Bác còn học ở Long xuyên về.</p><p style="font-size:21px">Bộ bàn ghế ở giữa nhà dùng để tiếp khách gồm: 1 bàn và 6 ghế đai, vào tháng 10/1975 Bác đã về đây ngồi hàng huyên tâm sự với gia đình và bà con hàng xóm.</p><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741611362/KLN/blog/bihg6hehui2g4jpqvefo.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px">Bộ bàn ghế ở giữa nhà</p><p style="font-size:21px">Tiền sảnh gần cửa đi vào ở gian thứ ba để lu nước uống gia đình bằng gốm men xanh lá, có nắp đậy bằng nhôm, đặt trên giá gỗ chân bằng thao lao.</p><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741611362/KLN/blog/vhxjxmahrorcyzn8ifx7.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px">Bộ bàn ghế ở giữa nhà</p><p style="font-size:21px">Do ngôi nhà gắn liền với cuộc đời niên thiếu của Bác, vị lãnh tụ kính mến của giai cấp công nhân Việt Nam, người chiến sĩ cộng sản mẫu mực, người bạn chiến đấu thân thiết cùng chung chí hướng với Chủ tịch Hồ Chí Minh đã cống hiến gần trọn cuộc đời mình cho sự nghiệp đấu tranh giải phóng dân tộc.</p><p style="font-size:21px">Ngày 30/8/1984 Bộ Văn Hóa ra quyết định số 114/VHQĐ công nhận Ngôi nhà lưu niệm thời niên thiếu chủ tịch Tôn Đức Thắng là Di tích lịch sử văn hóa cấp quốc gia. Với những giá trị Lịch sử và Văn hóa đó nên 10/05/2012 Thủ tướng chính phủ ký quyết định công nhận Khu lưu niệm Chủ tịch Tôn Đức Thắng là di tích lịch sử quốc gia Đặc Biệt.</p><p style="font-size:21px">Do ngôi nhà gắn liền với cuộc đời niên thiếu của Bác, vị lãnh tụ kính mến của giai cấp công nhân Việt Nam, người chiến sĩ cộng sản mẫu mực, người bạn chiến đấu thân thiết cùng chung chí hướng với Chủ tịch Hồ Chí Minh đã cống hiến gần trọn cuộc đời mình cho sự nghiệp đấu tranh giải phóng dân tộc.</p><p style="font-size:21px">Ngày 30/8/1984 Bộ Văn Hóa ra quyết định số 114/VHQĐ công nhận Ngôi nhà lưu niệm thời niên thiếu chủ tịch Tôn Đức Thắng là Di tích lịch sử văn hóa cấp quốc gia. Với những giá trị Lịch sử và Văn hóa đó nên 10/05/2012 Thủ tướng chính phủ ký quyết định công nhận Khu lưu niệm Chủ tịch Tôn Đức Thắng là di tích lịch sử quốc gia Đặc Biệt.</p><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><img style="max-width:100%;height:auto" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741611362/KLN/blog/yshjdbti6olc5dqspt61.png" alt=""><p style="font-weight:700;font-size:18px;text-align:center;margin-top:10px">Bằng xếp hạng Di Tích Quốc Gia Đặc Biệt</p></div></div></div></div></div></div>', CAST(N'2025-03-10T12:23:11.577' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, 1, N'Ngôi nhà lưu niệm thời niên thiếu Chủ Tịch Tôn Đức Thắng được xây dựng vào năm 1887. Nhà được xây theo kiểu nhà sàn Nam bộ ba gian, 2 chái bát dần. Toàn bộ loại gỗ sử dụng trong nhà là gỗ thao lao, riêng bộ cột làm bằng gỗ tràm. Mái lợp ngói đại ống hay còn gọi là ngói âm dương. Tổng diện tích ngôi nhà là 156m2.')
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'fd1ac605-2eed-465d-a969-ee0b9f28429f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'GIA PHẢ BÁC TÔN', N'<div><div style="display:flex;justify-content:center"><img style="width:80%;margin-top:50px" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1741877420/KLN/blog/ydzzhsrfikcxk7ggcz2n.png" alt=""></div><div><p style="text-align:center;padding-top:20px;font-weight:700;color:#0e0e0d;font-size:35px">Gia phả chủ tịch Tôn Đức Thắng</p></div></div>', CAST(N'2025-03-13T15:23:25.343' AS DateTime), N'd3bf776b-d5f7-4662-90d2-c273bfb779d2', 0, 2, NULL)
INSERT [dbo].[Blog] ([blogId], [blogImage], [blogTitle], [blogContent], [createDate], [userId], [isDeleted], [mediaTypeId], [Description]) VALUES (N'9c80015f-071f-4d5e-a3b7-fb7c06fc6cae', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1737914574/Blog_e098054d-bbe1-4c68-8576-58a5255abf01.jpg', N'ĐỀN THỜ CHỦ TỊCH TÔN ĐỨC THẮNG

', N'<p style="margin-bottom:5px">Đền thờ cố Chủ tịch nước Tôn Đức Thắng thuộc thôn Đại Độ, xã Tiên Cường, huyện Tiên Lãng, Tp. Hải Phòng, là ngôi đền được phối thờ các vị lãnh tụ, các anh hùng liệt sỹ của đất nước, theo đúng sự giản dị, khiêm tốn của cố Chủ tịch.</p><p style="margin-bottom:5px">Trong chuyến đi công tác tại Hải Phòng, đoàn chúng tôi được vào thăm và dâng hương ở đền thờ cố Chủ tịch nước Tôn Đức Thắng ở Yên Lãng, Hải Phòng, và được ông Vũ Minh Đức nguyên bí thư đảng ủy huyện Yên Lãng, Hải Phòng giới thiệu lịch sử ngôi đền và công lao to lớn của cố Chủ tịch.</p><p style="margin-bottom:5px">Cách đây hơn 60 năm, sau chiến thắng lịch sử Điện Biên Phủ, hiệp định Giơ - ne - vơ được ký kết vào ngày 20/7/1954, đất nước tạm thời bị chia cắt làm 2 miền Nam - Bắc. Thực hiện chủ trương của Trung ương Đảng và Chính phủ về việc đón nhận cán bộ và đồng bào miền Nam tập kết ra miền Bắc, Hải Phòng được đón nhận nhiều cán bộ và đồng bào miền Nam tập kết. Vào thời điểm đó, Hải Phòng đã dành nhiều địa điểm, đất đai thuận lợi nhất để xây dựng các cơ sở sản xuất, các trường học cho đồng bào và con em cán bộ miền Nam làm việc, học tập và sinh sống. Huyện Tiên Lãng được chọn để xây dựng 2 nông trường với quy mô lớn dành cho đồng bào miền Nam tập kết, là nông trường Vinh Quang ở khu vực ven biển và nông trường Quý Cao thuộc xã Tiên Cường dành cho đồng bào Nam Bộ.</p><p style="margin-bottom:5px">Năm 1957, lần đầu tiên cố Chủ tịch nước Tôn Đức Thắng về thăm, động viên bà con miền Nam tập kết ở Hải Phòng và đến thăm nông trường Quý Cao, nơi mà có nhiều bà con, anh em đều là người Nam bộ, khi đến đây cố Chủ tịch rất xúc động trước mảnh đất và con người nơi đây, vì nó giống với quê hương Nam bộ của cố Chủ tịch, cũng sông ngòi chằng chịt với những cù lao lớn nhỏ ven sông, ruộng đồng màu mỡ, cũng với những người nông dân thật thà, chất phác, hăng say lao động, rất gần gũi và thân thiện, cố Chủ tịch nước Tôn Đức Thắng rất mến vùng đất này giống quê hương của cố Chủ tịch, và đây cũng là nơi cưu mang, đùm bọc những người thân ở miền Nam tập kết.</p><p style="margin-bottom:5px">Mỗi lần về thăm nơi đây cố Chủ tịch luôn động viên bà con miền Nam yên tâm hăng say lao động, học tập, công tác và sẵn sàng trở lại quê hương đấu tranh thống nhất đất nước. Nguyện vọng của cố Chủ tịch nước Tôn Đức Thắng muốn có một ngôi nhà để gần gũi bà con quê hương ở nông trường Quý Cao này và coi đây như là quê hương thứ hai của mình. Được Trung ương Đảng chấp thuận, cố Chủ tịch đã chọn địa điểm xây dựng ngôi nhà gần bờ sông, cạnh bến phà Quý Cao và dành trọn số tiền thưởng từ giải thưởng Quốc tế hòa bình Lê nin do Đảng và Nhà nước Liên Xô trao tặng lúc đó là 24000 rúp để xây nhà. Ngôi nhà được xây dựng theo lối kiến trúc Nam bộ, tại đây cố Chủ tịch thường xuyên đi về vào các ngày cuối tuần để nghỉ ngơi và làm việc. Trải qua thời gian, cùng với sự tác động của chiến tranh ngôi nhà đã xuống cấp nghiêm trọng. Sau năm 1975, đất nước thống nhất, ngôi nhà được phục dựng lại, song không được như kiến trúc ban đầu.</p><p style="margin-bottom:5px">Năm 2005, ngôi nhà cố Chủ tịch ở xã Tiên Cường được Ủy ban nhân dân thành phố Hải Phòng xếp hạng là di tích lịch sử văn hóa cấp thành phố, đây là di tích lưu niệm duy nhất ở Hải Phòng cũng như ở miền Bắc về cố Chủ tịch nước Tôn Đức Thắng.</p><p style="margin-bottom:5px">Năm 2009, được sự đồng ý của thành phố, Công ty TNHH Điện lực Hải Phòng đã khởi công tôn tạo, nâng cấp Khu lưu niệm cố Chủ tịch nước Tôn Đức Thắng và mở rộng khuôn viên kiến trúc. Sau hơn một năm xây dựng, một số hạng mục của Dự án hoàn thành như: Ngôi nhà cố Chủ tịch (làm ngay trên nền đất cũ và theo nguyên mẫu ban đầu, ngôi nhà được xây dựng theo lối kiến trúc Nam bộ truyền thống), nhà khách gồm 2 tầng, đường vào khu lưu niệm, vườn cây, ao cá… với kinh phí khoảng 30 tỷ đồng. Đây là kinh phí đóng góp của cán bộ, công nhân viên của Công ty TNHH Điện lực Hải Phòng và một số doanh nghiệp, cán bộ, Đảng viên và Nhân dân huyện Tiên Lãng… đến cuối năm 2010, việc xây dựng gặp nhiều khó khăn, chủ yếu là do kinh phí.</p><p style="margin-bottom:5px">Xác định nơi đây không những là công trình lịch sử văn hóa, nơi tưởng niệm công lao to lớn, cuộc đời và sự nghiệp cách mạng của cố Chủ tịch nước Tôn Đức Thắng đối với Đảng và dân tộc, mà còn là 1 nơi có ý nghĩa to lớn trong việc giáo dục truyền thống cách mạng, lòng yêu quê hương đất nước cho thế hệ trẻ, Ban Trị sự Giáo hội Phật giáo Việt Nam huyện Tiên Lãng đứng đầu là Đại đức Thích Quảng Minh chủ trì vận động và xây dựng các hạng mục còn lại của dự án gồm: Ngôi đền thờ cố Chủ tịch, nhà bia, lầu chuông, lầu trống, cổng tam quan, hệ thống vườn hoa cây cảnh, tường bao, đường nội bộ trong khu lưu niệm… Kinh phí cho giai đoạn này khoảng 50 tỷ đồng bằng nguồn xã hội hóa.</p><p style="margin-bottom:5px">Sau khi được chuyển giao tiếp tục xây dựng dự án Khu Lưu niệm cố Chủ tịch nước Tôn Đức Thắng tại xã Tiên Cường, mặc dù còn gặp rất nhiều khó khăn, nhất là kinh phí để xây dựng, nhưng với sự quyết tâm cao của Đảng bộ, chính quyền, cán bộ và nhân dân huyện Tiên Lãng, ngôi đền thờ cố Chủ tịch và một số hạng mục phụ cận hoàn thành đúng vào dịp kỷ niệm 60 năm Ngày Giải phóng Hải Phòng (13/5/1955 - 13/5/2015).</p><div class="d-flex flex-wrap justify-content-center"><img style="width:50%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742488850/KLN/blog/u9dnbxvy64c8wlsxdev6.jpg" alt=""></div><div class="d-flex flex-wrap justify-content-center mt-3"><img style="width:50%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742488889/KLN/blog/kd7sykfuyonu7m4lpunk.jpg" alt=""></div><p style="margin-bottom:5px">Đây là ngôi đền được đầu tư xây dựng có phong cách và kiến trúc độc đáo. Ngôi đền được xây dựng theo kiểu chữ Đinh, được tọa lạc trên một thế đất có “Long chầu, Hổ phụ”. Cổng phía trước đền là sông Thái Bình hiền hòa, êm ả, đền có 8 gian, 5 gian tiền đường, 3 gian hậu cung, sử dụng hết 240 m3 gỗ lim với 64 cây cột cao 7,4m, đường kính cột tới gần nửa mét.</p><p style="margin-bottom:5px">Đặc biệt và độc đáo là 12 góc đao, mỗi góc đao dài và cong vút tới 2,5m, được tạo tác bằng gốm sứ bát tràng có hình long, ly, quy, phượng, được phủ một lớp men ngọc lục. Các đầu bẩy, các bức cuốn, ván long… đều được trạm khắc theo các đề tài thuần việt như: hình lá dâu, lá đề, hoa sen, hoa cúc, mộc mạc nhưng hết sức tinh xảo, mang đậm tính cách của người Nam Bộ.</p><p style="margin-bottom:5px">Ngôi đền có diện tích 380 m2, trong đền có tượng cố Chủ tịch bằng đồng nguyên chất, nặng 920 kg (tương ứng với con số 92 là tuổi thọ của cố Chủ tịch). Các nhang án, khám thờ, đại tự, cửa vòng, hoành phi, câu đối… được làm bằng gỗ quý, có sơn son, thiếp vàng,</p><p style="margin-bottom:5px">Việc bố trí thờ tự ở 3 gian hậu cung ở đền cũng có nét độc đáo riêng, gồm: Gian chính giữa thờ cố Chủ tịch; hai gian bên cạnh, một bên là thờ gia thất nội ngoại, một bên là thờ thân phụ, thân mẫu của cố Chủ tịch. 5 gian tiền đường phía ngoài, gian giữa đặt ban thờ sơn hà xã tắc (hồn thiêng sông núi), hai gian bên cạnh thờ các vị lãnh tụ tiền bối qua các thời kỳ, gian ngoài bên phải thờ hơn 4.000 anh hùng liệt sỹ của huyện Tiên Lãng, gian ngoài bên trái thờ các anh hùng liệt sỹ của cả nước. Ngôi đền thờ cố Chủ tịch nước được phối thờ các vị lãnh tụ, các anh hùng liệt sỹ của đất nước, đây là nét riêng của ngôi đền, phù hợp với đức tính của cố Chủ tịch là tất cả vì tổ quốc, vì nhân dân.</p><p style="margin-bottom:5px">Ngoài ra còn có nhà bảo tàng trưng bày nhiều hình ảnh, hiện vật, các tư liệu về cuộc đời và sự nghiệp của cố Chủ tịch nước Tôn Đức Thắng.</p><div class="d-flex flex-wrap justify-content-center"><img style="width:50%" src="https://res.cloudinary.com/dydpf7z8u/image/upload/v1742488963/KLN/blog/hlpb8vz1gtw7guj4czio.jpg" alt=""></div><p style="margin-bottom:5px">Một công trình mang tính lịch sử, văn hóa tưởng nhớ một người con của dân tộc Việt Nam, của mảnh đất An Giang đã hiến dâng cả đời mình cho độc lập, tự do của dân tộc và cho lý tưởng cộng sản, của tinh thần cách mạng bất khuất và đạo đức chí công vô tư, tác phong khiêm tốn, giản dị cho đất nước.</p><p style="margin-bottom:5px">(Trích nguồn:<a href="http://btgcp.gov.vn">http://btgcp.gov.vn</a>)</p>', CAST(N'2025-01-14T03:04:50.827' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0, 3, NULL)
GO
INSERT [dbo].[Book] ([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic], [isDeleted], [mediaTypeId], [Description]) VALUES (N'a415120c-0717-4564-9cd3-0fef2acf7dfc', N'Thư của Hồ Chủ tịch và Chủ tịch Tôn Đức Thắng gửi Đại hội Phật giáo toàn quốc lần thứ III và lần thứ IV, Chỉ thị của Phủ Thủ tướng về việc chấp hành chính sách đối với chùa thờ phật và tăng ni', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742741505/KLN/book/image/Book_a415120c-0717-4564-9cd3-0fef2acf7dfc.jpg', CAST(N'2025-03-23T13:56:04.407' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742634868/KLN/book/PDF/iihnc1qfdimowbuzg61g.pdf', NULL, N'Thành Hội Phật giáo Thống nhất Hà Nội', NULL, 0, 1, N'Là tác phẩm tập hợp thư của Hồ Chủ tịch và Chủ tịch Tôn Đức Thắng gửi Đại hội Phật giáo toàn quốc lần thứ III và lần thứ IV, Chỉ thị của Phủ Thủ tướng về việc chấp hành chính sách đối với chùa thờ phật và tăng ni.')
INSERT [dbo].[Book] ([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic], [isDeleted], [mediaTypeId], [Description]) VALUES (N'e57864dd-054e-42d1-acc6-3aea192f9f51', N'Tôn Đức Thắng: Một con người bình thường – Vĩ đại', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742741653/KLN/book/image/Book_e57864dd-054e-42d1-acc6-3aea192f9f51.jpg', CAST(N'2025-01-12T07:42:59.267' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742634860/KLN/book/PDF/xriln1bgisxd8em6hmiu.pdf', N'Chính trị Quốc gia', N'Nhiều tác giả', N'2013', 0, 1, N'Nội dung gồm ba phần:


- Phần thứ nhất: Tôn Đức Thắng với cách mạng Việt Nam, tuyển chọn nội dung đã in trong cuốn sách Tôn Đức Thắng – tiểu sử do Nhà xuất bản Chính trị quốc gia -Sự thật ấn hành năm 2007.


- Phần thứ hai: Tôn Đức Thắng, biểu tượng của đại đoàn kết, tuyển chọn nội dung đã in trong cuốn sách Tôn Đức Thắng – Người cộng sản mẫu mực, biểu tượng của đại đoàn kết (Hồi ký) do Nhà xuất bản Chính trị quốc gia – Sự thật ấn hành năm 2013.


- Phần thứ ba: Tôn Đức Thắng – Một số bài viết chọn lọc, tuyển chọn nội dung đã in trong cuốn sách Tôn Đức Thắng – Những bài nói và viết chọn lọc do Nhà xuất bản Chính trị quốc gia -Sự thật ấn hành năm 2005.')
INSERT [dbo].[Book] ([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic], [isDeleted], [mediaTypeId], [Description]) VALUES (N'62200076-c762-42c7-b49d-3bd1286c2433', N'Tôn Đức Thắng: Nhà cách mạng bất tử', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742741710/KLN/book/image/Book_62200076-c762-42c7-b49d-3bd1286c2433.jpg', CAST(N'2025-01-12T07:42:59.267' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742634868/KLN/book/PDF/qrjatlwedqqq5cm0yjru.pdf', N'Kim Đồng', N'Nhiều tác giả', NULL, 0, 1, N'Tập sách ảnh Tôn Đức Thắng, nhà cách mạng bất tử được NXB Kim Đồng biên soạn với nhiều hình ảnh tư liệu, ghi nhận tóm tắt những đóng góp to lớn cũng như về phẩm chất đạo đức của Bác Tôn là một ấn phẩm có ý nghĩa không chỉ dành cho bạn đọc nhỏ tuổi mà còn là tập tư liệu quý báu, góp phần giáo dục thế hệ trẻ về truyền thống cách mạng, về một tấm gương sáng để mọi thế hệ học tập noi theo.')
INSERT [dbo].[Book] ([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic], [isDeleted], [mediaTypeId], [Description]) VALUES (N'112b82ce-32e8-46d5-952d-419fa298a53c', N'Kỷ niệm 115 năm ngày sinh Chủ tịch Tôn Đức Thắng (20/8/1888 – 20/8/2003)', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742740454/KLN/book/image/Book_112b82ce-32e8-46d5-952d-419fa298a53c.jpg', CAST(N'2025-03-23T13:56:06.493' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742634869/KLN/book/PDF/hwjhndclqvry3nynh1wi.pdf', NULL, N'Ban Tuyên giáo tỉnh An Giang', N'2003', 0, 1, N'Tài liệu tuyên truyền bao gồm các nội dung chính:


- Chỉ thị về việc tổ chức kỷ niệm lần thứ 115 ngày sinh Chủ tịch Tôn Đức Thắng (20/8/1888 – 20/8/2003)


- Hướng dẫn nội dung tuyên truyền kỷ niệm lần thứ 115 ngày sinh Chủ tịch Tôn Đức Thắng (20/8/1888 – 20/8/2003)


- Cuộc đời và sự nghiệp


- Bác Tôn yêu quý của chúng ta sẽ không còn nữa nhưng tấm gương sáng tuyệt vời của Bác sẽ mãi mãi tỏa sáng, dẫn dắt những lớp người kế tục sự nghiệp vẻ vang của Đảng và dân tộc ta tiến lên trên con đường xây dựng thành công CNXH.


- Đồng chí Tôn Đức Thắng là người tiêu biểu nhất cho chính sách đại đoàn kết của Đảng và Hồ Chủ tịch


- Đồng chí Tôn Đức Thắng là gương mẫu đạo đức cách mạng, suốt đời cần kiệm liêm chính; suốt đời hết lòng hết sức phục vụ cách mạng, phục vụ nhân dân.')
INSERT [dbo].[Book] ([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic], [isDeleted], [mediaTypeId], [Description]) VALUES (N'ae0b6001-eb38-4070-afa2-6c3a91050223', N'Tôn Đức Thắng: Người cộng sản mẫu mực biểu tượng của đại đoàn kết: Hồi ký', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742741582/KLN/book/image/Book_ae0b6001-eb38-4070-afa2-6c3a91050223.jpg', CAST(N'2025-03-23T13:56:01.253' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742634860/KLN/book/PDF/bucrd0uo9szmykkrgbij.pdf', N'Chính trị Quốc gia', N'Nhiều tác giả', N'2003', 0, 1, N'Tham gia viết cuốn sách này là các đồng chí lãnh đạo Đảng và Nhà nước, các bậc lão thành cách mạng, các nhà nghiên cứu, các nhà văn hóa, các nhà hoạt động thực tiễn, các bạn chiến đấu, các cộng sự, các cán bộ phục vụ và bảo vệ đồng chí Tôn Đức Thắng lúc hoạt động bí mật cũng như công khai…Đó là những nhân chứng lịch sử đã dành những tình cảm sâu sắc, chân thành, kính mến đối với đồng chí Tôn Đức Thắng. Các bài viết đã phản ánh sinh động và chân thành về tài năng, đức độ và cống hiến lớn lao của đồng chí Tôn Đức Thắng đối với tiến trình phát triển của cách mạng Việt Nam.')
INSERT [dbo].[Book] ([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic], [isDeleted], [mediaTypeId], [Description]) VALUES (N'9474eeaf-4519-4761-a129-9d0c34378df5', N'Tôn Đức Thắng với phong trào công nhân Sài Gòn đầu thế kỷ XX đến năm 1930', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742740668/KLN/book/image/Book_9474eeaf-4519-4761-a129-9d0c34378df5.jpg', CAST(N'2025-03-23T13:56:05.793' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742634860/KLN/book/PDF/s0h5i2pflsoc7dwfdcat.pdf', N'Chính trị Quốc gia', N'Phạm Dương Mỹ Thu Huyền', N'2008', 0, 1, N'Nội dung cung cấp nhiều tư liệu quý, góp phần giáo dục truyền thống cách mạng cho toàn Đảng, toàn dân, nhất là tuổi trẻ Việt Nam, qua đó thể hiện lòng kính trọng và sự cảm phục về những đóng góp to lớn của nhà lãnh đạo kiệt xuất của Đảng và Nhà nước, người chiến sĩ cách mạng kiên cường, người cộng sản mẫu mực, suốt đời vì nước vì dân, người chiến sĩ quốc tế có uy tín, biểu tượng của đại đoàn kết dân tộc.')
INSERT [dbo].[Book] ([bookId], [title], [image], [createDate], [userId], [bookContent], [publisher], [author], [yearPublic], [isDeleted], [mediaTypeId], [Description]) VALUES (N'1224989a-b1ed-48cb-97ce-fcf277d34893', N'Tôn Đức Thắng: Những bài nói và viết chọn lọc', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742741450/KLN/book/image/Book_1224989a-b1ed-48cb-97ce-fcf277d34893.jpg', CAST(N'2025-03-23T13:56:05.140' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742634860/KLN/book/PDF/xqapblagl1vkgzgkiuva.pdf', N'Chính trị Quốc gia', N'Nhiều tác giả', N'2005', 0, 1, N'Cuốn sách bao gồm một số bài nói và viết về đồng chí Tôn Đức Thắng từ năm 1946 đến khi đồng chí qua đời năm 1980. Thông qua nội dung của cuốn sách, bạn đọc thấy rõ được cả cuộc đời của đồng chí Tôn Đức Thắng luôn chăm lo tới đoàn kết đồng chí, đoàn kết đồng bào, đoàn kết dân tộc, đoàn kết quốc tế vì độc lập, thống nhất Tổ quốc, vì chủ nghĩa xã hội.')
GO
INSERT [dbo].[Magazine] ([magazineId], [title], [image], [createDate], [userId], [magazineContent], [isDeleted], [mediaTypeId], [Description]) VALUES (N'd0c16d5c-5574-4449-a410-5472ca6f1340', N'Magazine1', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512914/nhasan_5_s2yhyu.jpg', CAST(N'2025-01-12T13:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512588/BacHoBacTonvaCacAnh.pdf', 0, NULL, NULL)
INSERT [dbo].[Magazine] ([magazineId], [title], [image], [createDate], [userId], [magazineContent], [isDeleted], [mediaTypeId], [Description]) VALUES (N'afe00928-977a-4bcc-8dcc-6236dd223783', N'Magazine2', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512868/gioi-thieu-kln_eokgdn.jpg', CAST(N'2025-01-13T13:00:00.000' AS DateTime), N'c11546db-1ae9-46c3-8f86-3c606c6d67cd', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512588/BacHoBacTonvaCacAnh.pdf', 0, NULL, NULL)
GO
INSERT [dbo].[MediaType] ([mediaTypeId], [typeName], [typeDescription]) VALUES (1, N'Khu lưu niệm bác Tôn', NULL)
INSERT [dbo].[MediaType] ([mediaTypeId], [typeName], [typeDescription]) VALUES (2, N'Chủ tịch Tôn Đức Thắng', NULL)
INSERT [dbo].[MediaType] ([mediaTypeId], [typeName], [typeDescription]) VALUES (3, N'Công trình mang tên bác Tôn', NULL)
GO
INSERT [dbo].[Music] ([musicId], [title], [author], [createDate], [userId], [imageLink], [audioLink], [isDeleted], [mediaTypeId], [Description]) VALUES (N'97a46d22-98e3-45b0-b2b9-217ac45b1ec8', N'Music1', N'Author One', CAST(N'2025-01-12T15:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512956/ag2-860x520_hz77hl.jpg', N'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736072269/08_buaeek.mp3', 0, 2, NULL)
INSERT [dbo].[Music] ([musicId], [title], [author], [createDate], [userId], [imageLink], [audioLink], [isDeleted], [mediaTypeId], [Description]) VALUES (N'8025c4ee-838d-406b-b1d6-a21f4a40fddc', N'Music2', N'Author Two', CAST(N'2025-01-13T15:00:00.000' AS DateTime), N'24dcccd9-9174-4c7d-a4e1-1749d71d7dc7', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512980/nha-trung-bay1_y7i7mb.jpg', N'https://res.cloudinary.com/dydpf7z8u/video/upload/v1736072246/06_c6ylkq.mp3', 0, 2, NULL)
GO
INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (1, N'Admin')
INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (2, N'User')
GO
INSERT [dbo].[SlideShow] ([slideShowId], [title], [image], [createDate], [userId], [slideImage], [isDeleted], [mediaTypeId], [Description], [slideShowTypeId]) VALUES (N'b53cbd68-9821-4e24-adf0-918671fdef42', N'Hình ảnh nghệ thuật về chủ tịch Tôn Đức Thắng', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512873/cdvsn_condao_vazrvu.jpg', CAST(N'2025-03-16T14:14:32.973' AS DateTime), N'24dcccd9-9174-4c7d-a4e1-1749d71d7dc7', N'[
    {
        "Id": 1,
        "Capture": "Capture1",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/vvkxklgecyqqgyw2ncd5.jpg"
    },
    {
        "Id": 2,
        "Capture": "Capture2",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/cj74sarien0zmqekkwnv.jpg"
    },
    {
        "Id": 3,
        "Capture": "Capture3",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/znnz5itkcl71kgauetvr.jpg"
    },
    {
        "Id": 4,
        "Capture": "Capture4",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/vcvtb4s2f7foice407lm.jpg"
    },
    {
        "Id": 5,
        "Capture": "Capture5",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/y1g6lcjjpzm9qhohftel.jpg"
    },
    {
        "Id": 6,
        "Capture": "Capture6",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/ciqekqnzmq8jpyvpcelr.jpg"
    }
]', 0, 2, NULL, 3)
INSERT [dbo].[SlideShow] ([slideShowId], [title], [image], [createDate], [userId], [slideImage], [isDeleted], [mediaTypeId], [Description], [slideShowTypeId]) VALUES (N'308960ec-5c3b-4d2c-bf5f-9b60294d84b1', N'SlideShow2', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512873/cdvsn_condao_vazrvu.jpg', CAST(N'2025-01-13T12:00:00.000' AS DateTime), N'24dcccd9-9174-4c7d-a4e1-1749d71d7dc7', N'[
    {
        "Id": 1,
        "Capture": "Capture1",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512950/nhatu2_jrrtfs.jpg"
    },
    {
        "Id": 2,
        "Capture": "Capture2",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512868/cdvsn_conghoi_veyjno.jpg"
    }
]', 0, 1, NULL, 2)
INSERT [dbo].[SlideShow] ([slideShowId], [title], [image], [createDate], [userId], [slideImage], [isDeleted], [mediaTypeId], [Description], [slideShowTypeId]) VALUES (N'c93e6bfd-60e2-420e-857e-db72b2cac656', N'Hiện Vật & Hình Ảnh', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1741973498/KLN/SlideShow/SlideImage/jfc6wvurtmtyx9firhrh.png', CAST(N'2025-01-12T12:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'[
    {
        "Id": 1,
        "Capture": "Capture1",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/vvkxklgecyqqgyw2ncd5.jpg"
    },
    {
        "Id": 2,
        "Capture": "Capture2",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/cj74sarien0zmqekkwnv.jpg"
    },
    {
        "Id": 3,
        "Capture": "Capture3",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/znnz5itkcl71kgauetvr.jpg"
    },
    {
        "Id": 4,
        "Capture": "Capture4",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/vcvtb4s2f7foice407lm.jpg"
    },
    {
        "Id": 5,
        "Capture": "Capture5",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/y1g6lcjjpzm9qhohftel.jpg"
    },
    {
        "Id": 6,
        "Capture": "Capture6",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742028368/KLN/SlideShow/SlideImage/ciqekqnzmq8jpyvpcelr.jpg"
    }
]', 0, 1, N'Xe đạp DYNHO: Bác Tôn mua tại Cửa hàng mậu dịch Tràng Thi năm 1957.', 1)
GO
INSERT [dbo].[SlideShowType] ([slideShowTypeId], [typeName], [typeDescription]) VALUES (1, N'HIỆN VẬT VÀ HÌNH ẢNH', NULL)
INSERT [dbo].[SlideShowType] ([slideShowTypeId], [typeName], [typeDescription]) VALUES (2, N'NHÀ TRƯNG BÀY THÂN THẾ VÀ SỰ NGHIỆP CÁCH MẠNG', NULL)
INSERT [dbo].[SlideShowType] ([slideShowTypeId], [typeName], [typeDescription]) VALUES (3, N'HÌNH ẢNH NGHỆ THUẬT VỀ CHỦ TỊCH TÔN ĐỨC THĂNG', NULL)
GO
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'c9d371fe-54bc-433e-b503-07136b2e66b3', N'Thứ trưởng: LÊ QUỐC DOANH', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615246/KLN/solemnVisit/visitor/ekvmnro6npsrer8rkvb7.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615690/KLN/solemnVisit/letter/ghelzj2584cesol47ocm.jpg', CAST(N'2025-01-12T10:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'08f2ff3e-9c1d-4851-8034-0cf89623c6f0', N'Chủ tịch Quốc hội: NGUYỄN THỊ KIM NGÂN', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615245/KLN/solemnVisit/visitor/qqkububgbqtdrgnxdjqd.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615689/KLN/solemnVisit/letter/bilkslcxf0sg1tlfkec5.jpg', CAST(N'2025-01-12T10:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'b695caa7-4e37-4aed-8162-14f25f4241b3', N'Chủ tịch nước: TRẦN ĐẠI QUANG', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615245/KLN/solemnVisit/visitor/fng3m70vuu6vkdwimnnj.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615687/KLN/solemnVisit/letter/bfjnsgolyqv6sahqoho7.jpg', CAST(N'2025-01-13T11:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'7f1d3615-bb02-4599-8133-2ec9682bf68b', N'TRƯỞNG BAN TUYÊN GIÁO TRUNG ƯƠNG: ĐINH THẾ HUYNH', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615245/KLN/solemnVisit/visitor/n7dmcc4htryefei3qxqs.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615691/KLN/solemnVisit/letter/fxeorwpwdmom0d312ogf.jpg', CAST(N'2025-01-12T10:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'784ac90a-0ef8-493a-84a5-3d2dab7bd051', N'Chủ tịch Uỷ ban Trung ương Mặt trận Tổ quốc Việt Nam: Huỳnh Đảm', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615246/KLN/solemnVisit/visitor/x4zmjemuc4q1zdvewcsh.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615691/KLN/solemnVisit/letter/sda0g67zwsrcfcfjnix4.jpg', CAST(N'2025-01-12T10:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'7ab0b420-4ce9-483f-9c15-43745d204cd7', N'Chủ tịch nước: TRƯƠNG TẤN SANG', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615246/KLN/solemnVisit/visitor/oo6hm7sinmfsontlpnir.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615687/KLN/solemnVisit/letter/y7lep7hwyhdcbc02lpt1.jpg', CAST(N'2025-01-13T11:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'74a6a819-ffa9-4a50-bea3-47851fa4d98f', N'Phó Chủ tịch Quốc hội: TÒNG THỊ PHÓNG', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615246/KLN/solemnVisit/visitor/jzfbrxv1iaz2iruoohj6.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615687/KLN/solemnVisit/letter/qjq8ejwgq7npcropngky.jpg', CAST(N'2025-01-13T11:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'573524e3-3e43-4a10-aedb-504f7245a34f', N'Phó Chủ tịch nước: ĐẶNG THỊ NGỌC THỊNH', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615246/KLN/solemnVisit/visitor/iwlst1c7rgtd2kdcd4bi.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615692/KLN/solemnVisit/letter/nytk4kokk6depl5qxriw.jpg', CAST(N'2025-01-12T10:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'b080b393-d4ff-4430-8e91-56148df1e7c4', N'Chủ tịch Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam: TRẦN THANH MẪN', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615245/KLN/solemnVisit/visitor/ed2apoadfrqyc4a9cnhg.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615688/KLN/solemnVisit/letter/jcbscoreyyiq1gqyyhvu.jpg', CAST(N'2025-01-13T11:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'a7bac7c5-1803-4575-b8b0-68a9d2eca4b9', N'Phó Chủ tịch UBND TPHCM: HUỲNH CÁCH MẠNG', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615247/KLN/solemnVisit/visitor/gvn0apcabbexuref6scq.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615692/KLN/solemnVisit/letter/muizvdbem6n9rjgzm0xz.jpg', CAST(N'2025-01-12T10:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'a31e6ea5-973f-462a-9fe5-7f84e999882e', N'Ủy viên Bộ Chính trị: TRƯƠNG THỊ MAI', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615246/KLN/solemnVisit/visitor/agyoqkvd0o7gfv8ort8l.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615689/KLN/solemnVisit/letter/y1bdzyxdrxb70d3fl7md.jpg', CAST(N'2025-01-13T11:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'c33ce3ea-637d-44ac-bf4e-b49d6bc54b4d', N'Bộ trưởng: Nguyễn Chí Dũng', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615246/KLN/solemnVisit/visitor/mwm04kqlvvoxcy4odaek.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615692/KLN/solemnVisit/letter/dakhc6rs5aytxzwpcgtc.jpg', CAST(N'2025-01-12T10:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'3be0683c-84e9-400a-84fe-e880c1534fb7', N'Thiếu tướng: TRẦN HOÀI TRUNG', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615247/KLN/solemnVisit/visitor/xbjlnavmct7r7zkv0bdt.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615690/KLN/solemnVisit/letter/fkk5lifkm3mmt2gbmvah.jpg', CAST(N'2025-01-13T11:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
INSERT [dbo].[SolemnVisit] ([visitId], [name], [portraitImage], [letterImage], [createDate], [userId], [isDeleted]) VALUES (N'e65ab068-10cb-4706-a33b-f7865e66f2ee', N'Chủ tịch Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam: NGUYỄN THIỆN NHÂN', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615245/KLN/solemnVisit/visitor/soynjj2cfmn3ougekozr.jpg', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615698/KLN/solemnVisit/letter/ujl8uezzgwgvuqyqbhf2.jpg', CAST(N'2025-01-12T10:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 0)
GO
INSERT [dbo].[Topic] ([topicId], [capture], [createDate], [isDeleted], [images], [videos], [userId], [mediaTypeId], [Description]) VALUES (N'7d306421-4c7c-4eca-95ba-5855684ed78b', N'Chuyên đề 1', CAST(N'2025-03-16T14:23:56.230' AS DateTime), 0, N'[
        {
        "Id": 1,
        "Capture": "Image 1",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512982/tuong-dai-tdt-ag_kbhaka.jpg"
    },
    {
        "Id": 2,
        "Capture": "Image 2",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512982/tuong-dai-tdt-ag_kbhaka.jpg"
    }
    ]', NULL, N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 2, NULL)
INSERT [dbo].[Topic] ([topicId], [capture], [createDate], [isDeleted], [images], [videos], [userId], [mediaTypeId], [Description]) VALUES (N'2ff0c9d4-0e98-4b0a-a196-f5654d854f90', N'Topic1', CAST(N'2025-01-12T10:00:00.000' AS DateTime), 0, N'[
        {
        "Id": 1,
        "Capture": "Image 1",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512982/tuong-dai-tdt-ag_kbhaka.jpg"
    },
    {
        "Id": 2,
        "Capture": "Image 2",
        "ImageLink": "https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512982/tuong-dai-tdt-ag_kbhaka.jpg"
    }
    ]', NULL, N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 2, NULL)
INSERT [dbo].[Topic] ([topicId], [capture], [createDate], [isDeleted], [images], [videos], [userId], [mediaTypeId], [Description]) VALUES (N'5c2add35-d37d-4346-91e2-f9987b39c270', N'Topic2', CAST(N'2025-01-13T11:00:00.000' AS DateTime), 0, NULL, N'[
        {
        "Id": 1,
        "Capture": "Video 1",
        "VideoLink": "https://www.youtube.com/embed/ieno0teXxyI?si=HprDQ0erwLfjZWBj"
    },
    {
        "Id": 2,
        "Capture": "Video 2",
        "VideoLink": "https://www.youtube.com/embed/C0IKYErgHlw?si=3nyL7542FgCP3XcO"
    }
    ]', N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', 2, NULL)
GO
INSERT [dbo].[User] ([userId], [name], [email], [accountId]) VALUES (N'24dcccd9-9174-4c7d-a4e1-1749d71d7dc7', N'Bob Dan', N'bobdan@gmail.com', N'8a11cdc9-b8f2-49ad-bda2-abc3f566213e')
INSERT [dbo].[User] ([userId], [name], [email], [accountId]) VALUES (N'c11546db-1ae9-46c3-8f86-3c606c6d67cd', N'Marry Joe', N'marryjoe@gmail.com', N'450134b6-1b7f-4987-83b8-67d247ec52ef')
INSERT [dbo].[User] ([userId], [name], [email], [accountId]) VALUES (N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'Jake Johnson', N'jakejohnson@gmail.com', N'964d296d-09e0-4879-882d-b2fdef0a7b56')
GO
INSERT [dbo].[Video] ([videoId], [title], [createDate], [userId], [imageLink], [videoLink], [isDeleted], [mediaTypeId], [Description]) VALUES (N'206a9320-cd9f-4c5c-bd4f-3e9e2ba8600f', N'Video2', CAST(N'2025-01-13T14:00:00.000' AS DateTime), N'c11546db-1ae9-46c3-8f86-3c606c6d67cd', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512961/gg_rabfx7.jpg', N'https://www.youtube.com/embed/ieno0teXxyI?si=HprDQ0erwLfjZWBj', 0, 2, NULL)
INSERT [dbo].[Video] ([videoId], [title], [createDate], [userId], [imageLink], [videoLink], [isDeleted], [mediaTypeId], [Description]) VALUES (N'bbf9fcf3-f27c-46dc-9b33-cc692e046b4b', N'Video1', CAST(N'2025-01-12T14:00:00.000' AS DateTime), N'203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f', N'https://res.cloudinary.com/dydpf7z8u/image/upload/v1736512961/gettyimages-182880589-1493334765_y8yjmg.jpg', N'https://www.youtube.com/embed/C0IKYErgHlw?si=3nyL7542FgCP3XcO', 0, 2, NULL)
GO
