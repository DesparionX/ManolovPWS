using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class SomeAddonsToCV : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CVs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "CVs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Profession",
                table: "CVs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "Profession",
                table: "CVs");
        }
    }
}
