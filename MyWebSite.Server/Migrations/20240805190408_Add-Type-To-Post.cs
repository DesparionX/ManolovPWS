﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTypeToPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Posts");
        }
    }
}
