using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class Alter_INT_IDs_With_GUID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop the primary key, then drop and recreate the Id column for each table

            // WorkExperience table
            migrationBuilder.DropPrimaryKey("PK_WorkExperience", "WorkExperience");
            migrationBuilder.DropColumn(name: "Id", table: "WorkExperience");
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "WorkExperience",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");
            migrationBuilder.AddPrimaryKey("PK_WorkExperience", "WorkExperience", "Id");

            // Skill table
            migrationBuilder.DropPrimaryKey("PK_Skill", "Skill");
            migrationBuilder.DropColumn(name: "Id", table: "Skill");
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Skill",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");
            migrationBuilder.AddPrimaryKey("PK_Skill", "Skill", "Id");

            // Language table
            migrationBuilder.DropPrimaryKey("PK_Language", "Language");
            migrationBuilder.DropColumn(name: "Id", table: "Language");
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Language",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");
            migrationBuilder.AddPrimaryKey("PK_Language", "Language", "Id");

            // Education table
            migrationBuilder.DropPrimaryKey("PK_Education", "Education");
            migrationBuilder.DropColumn(name: "Id", table: "Education");
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Education",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");
            migrationBuilder.AddPrimaryKey("PK_Education", "Education", "Id");

            // Contact table
            migrationBuilder.DropPrimaryKey("PK_Contact", "Contact");
            migrationBuilder.DropColumn(name: "Id", table: "Contact");
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Contact",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");
            migrationBuilder.AddPrimaryKey("PK_Contact", "Contact", "Id");

            // Certificate table
            migrationBuilder.DropPrimaryKey("PK_Certificate", "Certificate");
            migrationBuilder.DropColumn(name: "Id", table: "Certificate");
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Certificate",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");
            migrationBuilder.AddPrimaryKey("PK_Certificate", "Certificate", "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Reverse the changes: remove Guid Ids and restore int IDENTITY columns

            // WorkExperience table
            migrationBuilder.DropPrimaryKey("PK_WorkExperience", "WorkExperience");
            migrationBuilder.DropColumn(name: "Id", table: "WorkExperience");
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "WorkExperience",
                type: "int",
                nullable: false)
                .Annotation("SqlServer:Identity", "1, 1");
            migrationBuilder.AddPrimaryKey("PK_WorkExperience", "WorkExperience", "Id");

            // Skill table
            migrationBuilder.DropPrimaryKey("PK_Skill", "Skill");
            migrationBuilder.DropColumn(name: "Id", table: "Skill");
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Skill",
                type: "int",
                nullable: false)
                .Annotation("SqlServer:Identity", "1, 1");
            migrationBuilder.AddPrimaryKey("PK_Skill", "Skill", "Id");

            // Language table
            migrationBuilder.DropPrimaryKey("PK_Language", "Language");
            migrationBuilder.DropColumn(name: "Id", table: "Language");
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Language",
                type: "int",
                nullable: false)
                .Annotation("SqlServer:Identity", "1, 1");
            migrationBuilder.AddPrimaryKey("PK_Language", "Language", "Id");

            // Education table
            migrationBuilder.DropPrimaryKey("PK_Education", "Education");
            migrationBuilder.DropColumn(name: "Id", table: "Education");
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Education",
                type: "int",
                nullable: false)
                .Annotation("SqlServer:Identity", "1, 1");
            migrationBuilder.AddPrimaryKey("PK_Education", "Education", "Id");

            // Contact table
            migrationBuilder.DropPrimaryKey("PK_Contact", "Contact");
            migrationBuilder.DropColumn(name: "Id", table: "Contact");
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Contact",
                type: "int",
                nullable: false)
                .Annotation("SqlServer:Identity", "1, 1");
            migrationBuilder.AddPrimaryKey("PK_Contact", "Contact", "Id");

            // Certificate table
            migrationBuilder.DropPrimaryKey("PK_Certificate", "Certificate");
            migrationBuilder.DropColumn(name: "Id", table: "Certificate");
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Certificate",
                type: "int",
                nullable: false)
                .Annotation("SqlServer:Identity", "1, 1");
            migrationBuilder.AddPrimaryKey("PK_Certificate", "Certificate", "Id");
        }
    }
}
