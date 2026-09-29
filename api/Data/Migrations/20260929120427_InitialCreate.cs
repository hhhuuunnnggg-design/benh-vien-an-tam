using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditLog",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLog", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "Hospital",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    MapUrl = table.Column<string>(type: "text", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    NumberOfRoom = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    DetailService = table.Column<string>(type: "text", nullable: false),
                    WorkingHour = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hospital", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "MedicalService",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    DetailService = table.Column<string>(type: "text", nullable: false),
                    WorkingHour = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsInsured = table.Column<bool>(type: "boolean", nullable: false),
                    InsuranceCap = table.Column<int>(type: "integer", nullable: false),
                    IsFeatured = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalService", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "Medicine",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    Unit = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsInsured = table.Column<bool>(type: "boolean", nullable: false),
                    InsuranceCap = table.Column<float>(type: "real", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicine", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "MomoLog",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MomoLog", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "Provider",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Hotline = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provider", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IsDoctor = table.Column<bool>(type: "boolean", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "TimeWorking",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    DayOfWeek = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeWorking", x => x.Uuid);
                });

            migrationBuilder.CreateTable(
                name: "HospitalDepartment",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    DepartmentUuid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalDepartment", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_HospitalDepartment_Department_DepartmentUuid",
                        column: x => x.DepartmentUuid,
                        principalTable: "Department",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_HospitalDepartment_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "Room",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Room", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_Room_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "HospitalMedicalService",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    MedicalServiceUuid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalMedicalService", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_HospitalMedicalService_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_HospitalMedicalService_MedicalService_MedicalServiceUuid",
                        column: x => x.MedicalServiceUuid,
                        principalTable: "MedicalService",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "MedicineInventory",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    MedicineUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    MinimumQuantity = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicineInventory", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_MedicineInventory_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_MedicineInventory_Medicine_MedicineUuid",
                        column: x => x.MedicineUuid,
                        principalTable: "Medicine",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    RoleUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_Account_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Account_Role_RoleUuid",
                        column: x => x.RoleUuid,
                        principalTable: "Role",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "RolePermission",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    RoleUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    PermissionUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Action = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermission", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_RolePermission_Permission_PermissionUuid",
                        column: x => x.PermissionUuid,
                        principalTable: "Permission",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_RolePermission_Role_RoleUuid",
                        column: x => x.RoleUuid,
                        principalTable: "Role",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "HospitalWorking",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    WorkingUuid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalWorking", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_HospitalWorking_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_HospitalWorking_TimeWorking_WorkingUuid",
                        column: x => x.WorkingUuid,
                        principalTable: "TimeWorking",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "ServiceWorking",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    ServiceUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    WorkingUuid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceWorking", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_ServiceWorking_MedicalService_ServiceUuid",
                        column: x => x.ServiceUuid,
                        principalTable: "MedicalService",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ServiceWorking_TimeWorking_WorkingUuid",
                        column: x => x.WorkingUuid,
                        principalTable: "TimeWorking",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "DoctorProfile",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Avatar = table.Column<string>(type: "text", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    DepartmentDisplay = table.Column<string>(type: "text", nullable: false),
                    Introduction = table.Column<string>(type: "text", nullable: false),
                    Expertise = table.Column<string>(type: "text", nullable: false),
                    Specialty = table.Column<string>(type: "text", nullable: false),
                    Workplace = table.Column<string>(type: "text", nullable: false),
                    IsFeatured = table.Column<bool>(type: "boolean", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorProfile", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_DoctorProfile_Account_AccountUuid",
                        column: x => x.AccountUuid,
                        principalTable: "Account",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_DoctorProfile_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "ExportTicket",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    AccountUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Note = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExportTicket", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_ExportTicket_Account_AccountUuid",
                        column: x => x.AccountUuid,
                        principalTable: "Account",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ExportTicket_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "ImportTicket",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    AccountUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    ProviderUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Note = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportTicket", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_ImportTicket_Account_AccountUuid",
                        column: x => x.AccountUuid,
                        principalTable: "Account",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ImportTicket_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ImportTicket_Provider_ProviderUuid",
                        column: x => x.ProviderUuid,
                        principalTable: "Provider",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "PatientProfile",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Avatar = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Gender = table.Column<int>(type: "integer", nullable: false),
                    Birthdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    MedicalCode = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "character varying(254)", maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientProfile", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_PatientProfile_Account_AccountUuid",
                        column: x => x.AccountUuid,
                        principalTable: "Account",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "DoctorDepartment",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    DoctorUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    DepartmentUuid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorDepartment", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_DoctorDepartment_Department_DepartmentUuid",
                        column: x => x.DepartmentUuid,
                        principalTable: "Department",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_DoctorDepartment_DoctorProfile_DoctorUuid",
                        column: x => x.DoctorUuid,
                        principalTable: "DoctorProfile",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "DoctorWorking",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    DoctorUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    WorkingUuid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorWorking", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_DoctorWorking_DoctorProfile_DoctorUuid",
                        column: x => x.DoctorUuid,
                        principalTable: "DoctorProfile",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_DoctorWorking_TimeWorking_WorkingUuid",
                        column: x => x.WorkingUuid,
                        principalTable: "TimeWorking",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "ExportTicketDetail",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    ExportTicketUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    MedicineUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExportTicketDetail", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_ExportTicketDetail_ExportTicket_ExportTicketUuid",
                        column: x => x.ExportTicketUuid,
                        principalTable: "ExportTicket",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ExportTicketDetail_Medicine_MedicineUuid",
                        column: x => x.MedicineUuid,
                        principalTable: "Medicine",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "ImportTicketDetail",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    ImportTicketUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    MedicineUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportTicketDetail", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_ImportTicketDetail_ImportTicket_ImportTicketUuid",
                        column: x => x.ImportTicketUuid,
                        principalTable: "ImportTicket",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ImportTicketDetail_Medicine_MedicineUuid",
                        column: x => x.MedicineUuid,
                        principalTable: "Medicine",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "Appointment",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientName = table.Column<string>(type: "text", nullable: false),
                    Gender = table.Column<int>(type: "integer", nullable: false),
                    MedicalCode = table.Column<string>(type: "text", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: false),
                    AppointmentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TimeSlot = table.Column<Guid>(type: "uuid", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    PatientUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    DoctorUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    MedicalServiceUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    RoomUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    DoctorNote = table.Column<string>(type: "text", nullable: false),
                    TotalPrice = table.Column<int>(type: "integer", nullable: false),
                    IsPaid = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointment", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_Appointment_DoctorProfile_DoctorUuid",
                        column: x => x.DoctorUuid,
                        principalTable: "DoctorProfile",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Appointment_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Appointment_MedicalService_MedicalServiceUuid",
                        column: x => x.MedicalServiceUuid,
                        principalTable: "MedicalService",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Appointment_PatientProfile_PatientUuid",
                        column: x => x.PatientUuid,
                        principalTable: "PatientProfile",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Appointment_Room_RoomUuid",
                        column: x => x.RoomUuid,
                        principalTable: "Room",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Appointment_TimeWorking_TimeSlot",
                        column: x => x.TimeSlot,
                        principalTable: "TimeWorking",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "ReviewDoctor",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    NumberOfStar = table.Column<int>(type: "integer", nullable: false),
                    PatientUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    DoctorUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsViewed = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewDoctor", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_ReviewDoctor_DoctorProfile_DoctorUuid",
                        column: x => x.DoctorUuid,
                        principalTable: "DoctorProfile",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ReviewDoctor_PatientProfile_PatientUuid",
                        column: x => x.PatientUuid,
                        principalTable: "PatientProfile",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "ReviewHospital",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    NumberOfStar = table.Column<int>(type: "integer", nullable: false),
                    PatientUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsViewed = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewHospital", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_ReviewHospital_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ReviewHospital_PatientProfile_PatientUuid",
                        column: x => x.PatientUuid,
                        principalTable: "PatientProfile",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "ReviewMedicalService",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    NumberOfStar = table.Column<int>(type: "integer", nullable: false),
                    PatientUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    MedicalServiceUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsViewed = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewMedicalService", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_ReviewMedicalService_MedicalService_MedicalServiceUuid",
                        column: x => x.MedicalServiceUuid,
                        principalTable: "MedicalService",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_ReviewMedicalService_PatientProfile_PatientUuid",
                        column: x => x.PatientUuid,
                        principalTable: "PatientProfile",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "AppointmentMedicalService",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    AppointmentUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    MedicalServiceUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Price = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentMedicalService", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_AppointmentMedicalService_Appointment_AppointmentUuid",
                        column: x => x.AppointmentUuid,
                        principalTable: "Appointment",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_AppointmentMedicalService_MedicalService_MedicalServiceUuid",
                        column: x => x.MedicalServiceUuid,
                        principalTable: "MedicalService",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "Prescription",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientProfileUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    DoctorProfileUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    HospitalUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: false),
                    AppointmentUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescription", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_Prescription_Appointment_AppointmentUuid",
                        column: x => x.AppointmentUuid,
                        principalTable: "Appointment",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Prescription_DoctorProfile_DoctorProfileUuid",
                        column: x => x.DoctorProfileUuid,
                        principalTable: "DoctorProfile",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Prescription_Hospital_HospitalUuid",
                        column: x => x.HospitalUuid,
                        principalTable: "Hospital",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_Prescription_PatientProfile_PatientProfileUuid",
                        column: x => x.PatientProfileUuid,
                        principalTable: "PatientProfile",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateTable(
                name: "PrescriptionDetail",
                columns: table => new
                {
                    Uuid = table.Column<Guid>(type: "uuid", nullable: false),
                    PrescriptionUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    MedicineUuid = table.Column<Guid>(type: "uuid", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    QuantityPerDose = table.Column<int>(type: "integer", nullable: false),
                    DosesPerDay = table.Column<int>(type: "integer", nullable: false),
                    Duration = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    IsExternal = table.Column<bool>(type: "boolean", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrescriptionDetail", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_PrescriptionDetail_Medicine_MedicineUuid",
                        column: x => x.MedicineUuid,
                        principalTable: "Medicine",
                        principalColumn: "Uuid");
                    table.ForeignKey(
                        name: "FK_PrescriptionDetail_Prescription_PrescriptionUuid",
                        column: x => x.PrescriptionUuid,
                        principalTable: "Prescription",
                        principalColumn: "Uuid");
                });

            migrationBuilder.InsertData(
                table: "Permission",
                columns: new[] { "Uuid", "Description", "Icon", "Name" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), "Theo dõi tình trạng vận hành và dữ liệu tổng hợp toàn hệ thống.", "dashboard", "tong-quan-he-thong" },
                    { new Guid("00000000-0000-0000-0000-000000000002"), "Quản lý chi nhánh và trạng thái hoạt động trên toàn hệ thống.", "hospital", "co-so-y-te" },
                    { new Guid("00000000-0000-0000-0000-000000000003"), "Quản lý danh mục chuyên khoa gốc dùng chung.", "department", "chuyen-khoa" },
                    { new Guid("00000000-0000-0000-0000-000000000004"), "Quản lý danh mục dịch vụ y tế gốc dùng chung.", "service", "dich-vu" },
                    { new Guid("00000000-0000-0000-0000-000000000005"), "Quản lý danh mục thuốc dùng chung giữa các chi nhánh.", "medicine", "thuoc" },
                    { new Guid("00000000-0000-0000-0000-000000000006"), "Quản lý tài khoản và quản trị viên chi nhánh.", "account", "tai-khoan" },
                    { new Guid("00000000-0000-0000-0000-000000000007"), "Xem báo cáo tổng hợp không bao gồm nội dung lâm sàng chi tiết.", "report", "bao-cao-he-thong" },
                    { new Guid("00000000-0000-0000-0000-000000000008"), "Theo dõi audit log và các hành động quản trị quan trọng.", "audit", "nhat-ky-he-thong" },
                    { new Guid("00000000-0000-0000-0000-000000000009"), "Theo dõi hoạt động khám chữa bệnh và vận hành trong chi nhánh.", "dashboard", "tong-quan-chi-nhanh" },
                    { new Guid("00000000-0000-0000-0000-000000000010"), "Cập nhật thông tin và giờ làm việc của chi nhánh.", "hospital", "thong-tin-chi-nhanh" },
                    { new Guid("00000000-0000-0000-0000-000000000011"), "Gán chuyên khoa và dịch vụ có sẵn cho chi nhánh.", "department", "chuyen-khoa-dich-vu" },
                    { new Guid("00000000-0000-0000-0000-000000000012"), "Quản lý phòng và trạng thái sử dụng trong chi nhánh.", "room", "phong-kham-chi-nhanh" },
                    { new Guid("00000000-0000-0000-0000-000000000013"), "Quản lý tài khoản nhân sự thuộc phạm vi chi nhánh.", "account", "nhan-su" },
                    { new Guid("00000000-0000-0000-0000-000000000014"), "Theo dõi, xác nhận, điều phối và hủy lịch thuộc chi nhánh.", "appointment", "lich-hen-chi-nhanh" },
                    { new Guid("00000000-0000-0000-0000-000000000015"), "Xem đơn thuốc khi cần xử lý nghiệp vụ được phân quyền.", "prescription", "don-thuoc-chi-nhanh" },
                    { new Guid("00000000-0000-0000-0000-000000000016"), "Theo dõi tồn kho và duyệt phiếu nhập xuất của chi nhánh.", "inventory", "kho-thuoc" },
                    { new Guid("00000000-0000-0000-0000-000000000017"), "Kiểm duyệt đánh giá liên quan đến chi nhánh.", "review", "danh-gia-chi-nhanh" },
                    { new Guid("00000000-0000-0000-0000-000000000018"), "Xem báo cáo vận hành và tài chính trong phạm vi chi nhánh.", "report", "bao-cao-chi-nhanh" },
                    { new Guid("00000000-0000-0000-0000-000000000019"), "Theo dõi audit log của chi nhánh.", "audit", "nhat-ky-chi-nhanh" },
                    { new Guid("00000000-0000-0000-0000-000000000020"), "Theo dõi lịch khám và công việc chuyên môn được phân công.", "dashboard", "tong-quan-bac-si" },
                    { new Guid("00000000-0000-0000-0000-000000000021"), "Xem lịch khám được phân công và đề xuất thay đổi khi cần.", "appointment", "lich-kham" },
                    { new Guid("00000000-0000-0000-0000-000000000022"), "Xem thông tin tối thiểu của bệnh nhân và hoàn thành ca khám.", "patient", "ca-kham" },
                    { new Guid("00000000-0000-0000-0000-000000000023"), "Tạo và quản lý đơn thuốc chưa thanh toán.", "prescription", "don-thuoc-bac-si" },
                    { new Guid("00000000-0000-0000-0000-000000000024"), "Tra cứu khả dụng của thuốc tại chi nhánh để hỗ trợ kê đơn.", "medicine", "thuoc-kha-dung" },
                    { new Guid("00000000-0000-0000-0000-000000000025"), "Cập nhật phần thông tin nghề nghiệp được cho phép.", "profile", "ho-so-nghe-nghiep" },
                    { new Guid("00000000-0000-0000-0000-000000000026"), "Theo dõi lịch hẹn, lượt chờ và tình trạng phòng trong ngày.", "dashboard", "tong-quan-tiep-nhan" },
                    { new Guid("00000000-0000-0000-0000-000000000027"), "Tạo lịch thay bệnh nhân, xác nhận, đổi lịch và phân phòng.", "appointment", "lich-hen-tiep-nhan" },
                    { new Guid("00000000-0000-0000-0000-000000000028"), "Check-in và cập nhật trạng thái vận hành của lượt khám.", "patient", "tiep-nhan" },
                    { new Guid("00000000-0000-0000-0000-000000000029"), "Theo dõi và cập nhật trạng thái phòng trong chi nhánh.", "room", "phong-kham-tiep-nhan" },
                    { new Guid("00000000-0000-0000-0000-000000000030"), "Thu tiền và cấp thuốc theo đơn khi được giao nhiệm vụ.", "payment", "thanh-toan-cap-thuoc" },
                    { new Guid("00000000-0000-0000-0000-000000000031"), "Hỗ trợ kiểm duyệt đánh giá khi có quyền phù hợp.", "review", "danh-gia-tiep-nhan" },
                    { new Guid("00000000-0000-0000-0000-000000000032"), "Theo dõi tồn kho, cảnh báo và hoạt động nhập xuất gần đây.", "dashboard", "tong-quan-kho" },
                    { new Guid("00000000-0000-0000-0000-000000000033"), "Xem số lượng thuốc hiện có trong kho chi nhánh.", "inventory", "ton-kho" },
                    { new Guid("00000000-0000-0000-0000-000000000035"), "Quản lý thông tin nhà cung cấp trong phạm vi được giao.", "provider", "nha-cung-cap" },
                    { new Guid("00000000-0000-0000-0000-000000000036"), "Tạo, sửa hoặc hủy phiếu khi còn chờ duyệt.", "ticket", "phieu-nhap-xuat" },
                    { new Guid("00000000-0000-0000-0000-000000000037"), "Điều chỉnh tồn kho với lý do bắt buộc và audit log.", "medicine", "dieu-chinh-ton" },
                    { new Guid("00000000-0000-0000-0000-000000000038"), "Tra cứu lịch sử nhập, xuất và biến động tồn kho.", "history", "lich-su" },
                    { new Guid("00000000-0000-0000-0000-000000000039"), "Xem báo cáo nhập, xuất, tồn và giá trị kho của chi nhánh.", "report", "bao-cao-kho" },
                    { new Guid("00000000-0000-0000-0000-000000000040"), "Quản lý danh mục khung giờ dùng chung trong hệ thống.", "schedule", "khung-gio-lam-viec" },
                    { new Guid("00000000-0000-0000-0000-000000000041"), "Gán và cập nhật lịch thực hiện cho dịch vụ.", "schedule", "gio-lam-viec-dich-vu" },
                    { new Guid("00000000-0000-0000-0000-000000000042"), "Quản lý role và permission của cổng nội bộ.", "permission", "phan-quyen" },
                    { new Guid("00000000-0000-0000-0000-000000000043"), "Cập nhật lịch hoạt động của bệnh viện.", "schedule", "gio-lam-viec-benh-vien" },
                    { new Guid("00000000-0000-0000-0000-000000000044"), "Xem lịch làm việc và tạo đơn đề nghị thay đổi.", "schedule", "gio-lam-viec-bac-si" }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Uuid", "CreatedAt", "DeletedAt", "Description", "IsDoctor", "Name", "Status", "UpdatedAt" },
                values: new object[] { new Guid("00000000-0000-0000-0000-000000000100"), new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "Tai khoan nguoi benh", false, "Patient", 0, new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.CreateIndex(
                name: "IX_Account_HospitalUuid",
                table: "Account",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Account_Phone",
                table: "Account",
                column: "Phone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Account_RoleUuid",
                table: "Account",
                column: "RoleUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_DoctorUuid",
                table: "Appointment",
                column: "DoctorUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_HospitalUuid",
                table: "Appointment",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_MedicalServiceUuid",
                table: "Appointment",
                column: "MedicalServiceUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_PatientUuid",
                table: "Appointment",
                column: "PatientUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_RoomUuid",
                table: "Appointment",
                column: "RoomUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_TimeSlot",
                table: "Appointment",
                column: "TimeSlot");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentMedicalService_AppointmentUuid",
                table: "AppointmentMedicalService",
                column: "AppointmentUuid");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentMedicalService_MedicalServiceUuid",
                table: "AppointmentMedicalService",
                column: "MedicalServiceUuid");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorDepartment_DepartmentUuid",
                table: "DoctorDepartment",
                column: "DepartmentUuid");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorDepartment_DoctorUuid",
                table: "DoctorDepartment",
                column: "DoctorUuid");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorProfile_AccountUuid",
                table: "DoctorProfile",
                column: "AccountUuid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DoctorProfile_HospitalUuid",
                table: "DoctorProfile",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorWorking_DoctorUuid",
                table: "DoctorWorking",
                column: "DoctorUuid");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorWorking_WorkingUuid",
                table: "DoctorWorking",
                column: "WorkingUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ExportTicket_AccountUuid",
                table: "ExportTicket",
                column: "AccountUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ExportTicket_HospitalUuid",
                table: "ExportTicket",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ExportTicketDetail_ExportTicketUuid",
                table: "ExportTicketDetail",
                column: "ExportTicketUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ExportTicketDetail_MedicineUuid",
                table: "ExportTicketDetail",
                column: "MedicineUuid");

            migrationBuilder.CreateIndex(
                name: "IX_HospitalDepartment_DepartmentUuid",
                table: "HospitalDepartment",
                column: "DepartmentUuid");

            migrationBuilder.CreateIndex(
                name: "IX_HospitalDepartment_HospitalUuid",
                table: "HospitalDepartment",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_HospitalMedicalService_HospitalUuid",
                table: "HospitalMedicalService",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_HospitalMedicalService_MedicalServiceUuid",
                table: "HospitalMedicalService",
                column: "MedicalServiceUuid");

            migrationBuilder.CreateIndex(
                name: "IX_HospitalWorking_HospitalUuid",
                table: "HospitalWorking",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_HospitalWorking_WorkingUuid",
                table: "HospitalWorking",
                column: "WorkingUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ImportTicket_AccountUuid",
                table: "ImportTicket",
                column: "AccountUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ImportTicket_HospitalUuid",
                table: "ImportTicket",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ImportTicket_ProviderUuid",
                table: "ImportTicket",
                column: "ProviderUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ImportTicketDetail_ImportTicketUuid",
                table: "ImportTicketDetail",
                column: "ImportTicketUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ImportTicketDetail_MedicineUuid",
                table: "ImportTicketDetail",
                column: "MedicineUuid");

            migrationBuilder.CreateIndex(
                name: "IX_MedicineInventory_HospitalUuid",
                table: "MedicineInventory",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_MedicineInventory_MedicineUuid",
                table: "MedicineInventory",
                column: "MedicineUuid");

            migrationBuilder.CreateIndex(
                name: "IX_PatientProfile_AccountUuid",
                table: "PatientProfile",
                column: "AccountUuid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PatientProfile_Email",
                table: "PatientProfile",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_AppointmentUuid",
                table: "Prescription",
                column: "AppointmentUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_DoctorProfileUuid",
                table: "Prescription",
                column: "DoctorProfileUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_HospitalUuid",
                table: "Prescription",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PatientProfileUuid",
                table: "Prescription",
                column: "PatientProfileUuid");

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionDetail_MedicineUuid",
                table: "PrescriptionDetail",
                column: "MedicineUuid");

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionDetail_PrescriptionUuid",
                table: "PrescriptionDetail",
                column: "PrescriptionUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewDoctor_DoctorUuid",
                table: "ReviewDoctor",
                column: "DoctorUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewDoctor_PatientUuid",
                table: "ReviewDoctor",
                column: "PatientUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewHospital_HospitalUuid",
                table: "ReviewHospital",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewHospital_PatientUuid",
                table: "ReviewHospital",
                column: "PatientUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewMedicalService_MedicalServiceUuid",
                table: "ReviewMedicalService",
                column: "MedicalServiceUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewMedicalService_PatientUuid",
                table: "ReviewMedicalService",
                column: "PatientUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Role_Name",
                table: "Role",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_PermissionUuid",
                table: "RolePermission",
                column: "PermissionUuid");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_RoleUuid",
                table: "RolePermission",
                column: "RoleUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Room_HospitalUuid",
                table: "Room",
                column: "HospitalUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceWorking_ServiceUuid",
                table: "ServiceWorking",
                column: "ServiceUuid");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceWorking_WorkingUuid",
                table: "ServiceWorking",
                column: "WorkingUuid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentMedicalService");

            migrationBuilder.DropTable(
                name: "AuditLog");

            migrationBuilder.DropTable(
                name: "DoctorDepartment");

            migrationBuilder.DropTable(
                name: "DoctorWorking");

            migrationBuilder.DropTable(
                name: "ExportTicketDetail");

            migrationBuilder.DropTable(
                name: "HospitalDepartment");

            migrationBuilder.DropTable(
                name: "HospitalMedicalService");

            migrationBuilder.DropTable(
                name: "HospitalWorking");

            migrationBuilder.DropTable(
                name: "ImportTicketDetail");

            migrationBuilder.DropTable(
                name: "MedicineInventory");

            migrationBuilder.DropTable(
                name: "MomoLog");

            migrationBuilder.DropTable(
                name: "PrescriptionDetail");

            migrationBuilder.DropTable(
                name: "ReviewDoctor");

            migrationBuilder.DropTable(
                name: "ReviewHospital");

            migrationBuilder.DropTable(
                name: "ReviewMedicalService");

            migrationBuilder.DropTable(
                name: "RolePermission");

            migrationBuilder.DropTable(
                name: "ServiceWorking");

            migrationBuilder.DropTable(
                name: "ExportTicket");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "ImportTicket");

            migrationBuilder.DropTable(
                name: "Medicine");

            migrationBuilder.DropTable(
                name: "Prescription");

            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "Provider");

            migrationBuilder.DropTable(
                name: "Appointment");

            migrationBuilder.DropTable(
                name: "DoctorProfile");

            migrationBuilder.DropTable(
                name: "MedicalService");

            migrationBuilder.DropTable(
                name: "PatientProfile");

            migrationBuilder.DropTable(
                name: "Room");

            migrationBuilder.DropTable(
                name: "TimeWorking");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "Hospital");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
