using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class Added_DbSets_To_All_SubEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Certificate_CVs_CVId",
                table: "Certificate");

            migrationBuilder.DropForeignKey(
                name: "FK_Contact_CVs_CVId",
                table: "Contact");

            migrationBuilder.DropForeignKey(
                name: "FK_Language_CVs_CVId",
                table: "Language");

            migrationBuilder.DropForeignKey(
                name: "FK_Skill_CVs_CVId",
                table: "Skill");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Skill",
                table: "Skill");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Language",
                table: "Language");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contact",
                table: "Contact");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Certificate",
                table: "Certificate");

            migrationBuilder.RenameTable(
                name: "Skill",
                newName: "Skills");

            migrationBuilder.RenameTable(
                name: "Language",
                newName: "Languages");

            migrationBuilder.RenameTable(
                name: "Contact",
                newName: "Contacts");

            migrationBuilder.RenameTable(
                name: "Certificate",
                newName: "Certificates");

            migrationBuilder.RenameIndex(
                name: "IX_Skill_CVId",
                table: "Skills",
                newName: "IX_Skills_CVId");

            migrationBuilder.RenameIndex(
                name: "IX_Language_CVId",
                table: "Languages",
                newName: "IX_Languages_CVId");

            migrationBuilder.RenameIndex(
                name: "IX_Contact_CVId",
                table: "Contacts",
                newName: "IX_Contacts_CVId");

            migrationBuilder.RenameIndex(
                name: "IX_Certificate_CVId",
                table: "Certificates",
                newName: "IX_Certificates_CVId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Skills",
                table: "Skills",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Languages",
                table: "Languages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Certificates",
                table: "Certificates",
                column: "Id");

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
                name: "FK_Languages_CVs_CVId",
                table: "Languages");

            migrationBuilder.DropForeignKey(
                name: "FK_Skills_CVs_CVId",
                table: "Skills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Skills",
                table: "Skills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Languages",
                table: "Languages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Certificates",
                table: "Certificates");

            migrationBuilder.RenameTable(
                name: "Skills",
                newName: "Skill");

            migrationBuilder.RenameTable(
                name: "Languages",
                newName: "Language");

            migrationBuilder.RenameTable(
                name: "Contacts",
                newName: "Contact");

            migrationBuilder.RenameTable(
                name: "Certificates",
                newName: "Certificate");

            migrationBuilder.RenameIndex(
                name: "IX_Skills_CVId",
                table: "Skill",
                newName: "IX_Skill_CVId");

            migrationBuilder.RenameIndex(
                name: "IX_Languages_CVId",
                table: "Language",
                newName: "IX_Language_CVId");

            migrationBuilder.RenameIndex(
                name: "IX_Contacts_CVId",
                table: "Contact",
                newName: "IX_Contact_CVId");

            migrationBuilder.RenameIndex(
                name: "IX_Certificates_CVId",
                table: "Certificate",
                newName: "IX_Certificate_CVId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Skill",
                table: "Skill",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Language",
                table: "Language",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contact",
                table: "Contact",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Certificate",
                table: "Certificate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Certificate_CVs_CVId",
                table: "Certificate",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contact_CVs_CVId",
                table: "Contact",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Language_CVs_CVId",
                table: "Language",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Skill_CVs_CVId",
                table: "Skill",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id");
        }
    }
}
