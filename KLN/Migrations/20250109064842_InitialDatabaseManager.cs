using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KLN.Migrations
{
    /// <inheritdoc />
    public partial class InitialDatabaseManager : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    role_id = table.Column<string>(type: "varchar", nullable: false),
                    role_name = table.Column<string>(type: "varchar", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.role_id);
                });

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    accountId = table.Column<string>(type: "varchar", nullable: false),
                    username = table.Column<string>(type: "nvarchar", nullable: true),
                    password = table.Column<string>(type: "varchar", nullable: true),
                    hide = table.Column<bool>(type: "bit", nullable: true),
                    passwordResetToken = table.Column<string>(type: "varchar", nullable: true),
                    tokenExpiration = table.Column<string>(type: "varchar", nullable: true),
                    role_id = table.Column<string>(type: "varchar", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.accountId);
                    table.ForeignKey(
                        name: "FK_Account_Role_role_id",
                        column: x => x.role_id,
                        principalTable: "Role",
                        principalColumn: "role_id");
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    userId = table.Column<string>(type: "varchar", nullable: false),
                    name = table.Column<string>(type: "nvarchar", nullable: true),
                    email = table.Column<string>(type: "varchar", nullable: true),
                    accountId = table.Column<string>(type: "varchar", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.userId);
                    table.ForeignKey(
                        name: "FK_User_Account_accountId",
                        column: x => x.accountId,
                        principalTable: "Account",
                        principalColumn: "accountId");
                });

            migrationBuilder.CreateTable(
                name: "Blog",
                columns: table => new
                {
                    blogId = table.Column<string>(type: "varchar", nullable: false),
                    blogTitle = table.Column<string>(type: "nvarchar", nullable: false),
                    blogContent = table.Column<string>(type: "nvarchar", nullable: false),
                    createDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    userId = table.Column<string>(type: "varchar", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blog", x => x.blogId);
                    table.ForeignKey(
                        name: "FK_Blog_User_userId",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "userId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SlideShow",
                columns: table => new
                {
                    slideShowId = table.Column<string>(type: "varchar", nullable: false),
                    title = table.Column<string>(type: "nvarchar", nullable: true),
                    image = table.Column<string>(type: "varchar", nullable: true),
                    createDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    userId = table.Column<string>(type: "varchar", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SlideShow", x => x.slideShowId);
                    table.ForeignKey(
                        name: "FK_SlideShow_User_userId",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "userId");
                });

            migrationBuilder.CreateTable(
                name: "LogSlideShow",
                columns: table => new
                {
                    logSlideShowId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    version = table.Column<string>(type: "varchar", nullable: true),
                    updateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    process = table.Column<string>(type: "varchar", nullable: true),
                    flag = table.Column<string>(type: "varchar", nullable: true),
                    title = table.Column<string>(type: "nvarchar", nullable: true),
                    image = table.Column<string>(type: "varchar", nullable: true),
                    createDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    userId = table.Column<string>(type: "varchar", nullable: true),
                    slideShowId = table.Column<string>(type: "varchar", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogSlideShow", x => x.logSlideShowId);
                    table.ForeignKey(
                        name: "FK_LogSlideShow_SlideShow_slideShowId",
                        column: x => x.slideShowId,
                        principalTable: "SlideShow",
                        principalColumn: "slideShowId");
                    table.ForeignKey(
                        name: "FK_LogSlideShow_User_userId",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "userId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_role_id",
                table: "Account",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_Blog_userId",
                table: "Blog",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_LogSlideShow_slideShowId",
                table: "LogSlideShow",
                column: "slideShowId");

            migrationBuilder.CreateIndex(
                name: "IX_LogSlideShow_userId",
                table: "LogSlideShow",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_SlideShow_userId",
                table: "SlideShow",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_User_accountId",
                table: "User",
                column: "accountId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blog");

            migrationBuilder.DropTable(
                name: "LogSlideShow");

            migrationBuilder.DropTable(
                name: "SlideShow");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
