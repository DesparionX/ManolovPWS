using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class Added_DbSets_To_All_SubEntities_VERSION4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Certificates_CVs_CVId",
                table: "Certificates");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_CVs_CVId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Education_CVs_CVId",
                table: "Education");

            migrationBuilder.DropForeignKey(
                name: "FK_Languages_CVs_CVId",
                table: "Languages");

            migrationBuilder.DropForeignKey(
                name: "FK_Skills_CVs_CVId",
                table: "Skills");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkExperience_CVs_CVId",
                table: "WorkExperience");

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "WorkExperience",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Skills",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Languages",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Education",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Contacts",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Certificates",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Certificates_CVs_CVId",
                table: "Certificates",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_CVs_CVId",
                table: "Contacts",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Education_CVs_CVId",
                table: "Education",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Languages_CVs_CVId",
                table: "Languages",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Skills_CVs_CVId",
                table: "Skills",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkExperience_CVs_CVId",
                table: "WorkExperience",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Certificates_CVs_CVId",
                table: "Certificates");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_CVs_CVId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Education_CVs_CVId",
                table: "Education");

            migrationBuilder.DropForeignKey(
                name: "FK_Languages_CVs_CVId",
                table: "Languages");

            migrationBuilder.DropForeignKey(
                name: "FK_Skills_CVs_CVId",
                table: "Skills");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkExperience_CVs_CVId",
                table: "WorkExperience");

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "WorkExperience",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Skills",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Languages",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Education",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Contacts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CVId",
                table: "Certificates",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Certificates_CVs_CVId",
                table: "Certificates",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_CVs_CVId",
                table: "Contacts",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Education_CVs_CVId",
                table: "Education",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Languages_CVs_CVId",
                table: "Languages",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Skills_CVs_CVId",
                table: "Skills",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkExperience_CVs_CVId",
                table: "WorkExperience",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
