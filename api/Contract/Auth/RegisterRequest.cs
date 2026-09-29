using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Contract.Auth;

public sealed class RegisterRequest : IValidatableObject
{
    [Required(ErrorMessage = "Ho va ten la bat buoc.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Ho va ten phai tu 2 den 100 ky tu.")]
    public string Name { get; init; } = string.Empty;

    [EnumDataType(typeof(Gender), ErrorMessage = "Gioi tinh khong hop le.")]
    public Gender Gender { get; init; } = Gender.Other;

    [Required(ErrorMessage = "Ngay sinh la bat buoc.")]
    public DateOnly? Birthdate { get; init; }

    [Required(ErrorMessage = "Email la bat buoc.")]
    [EmailAddress(ErrorMessage = "Email khong hop le.")]
    [StringLength(254)]
    public string Email { get; init; } = string.Empty;

    [Required(ErrorMessage = "So dien thoai la bat buoc.")]
    [RegularExpression(@"^(?:\+84|0)(?:3|5|7|8|9)\d{8}$", ErrorMessage = "So dien thoai Viet Nam khong hop le.")]
    public string Phone { get; init; } = string.Empty;

    [Required(ErrorMessage = "Mat khau la bat buoc.")]
    [StringLength(128, MinimumLength = 8, ErrorMessage = "Mat khau phai tu 8 den 128 ky tu.")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$", ErrorMessage = "Mat khau phai co chu thuong, chu hoa va chu so.")]
    public string Password { get; init; } = string.Empty;

    [Required(ErrorMessage = "Vui long nhap lai mat khau.")]
    [Compare(nameof(Password), ErrorMessage = "Mat khau nhap lai khong khop.")]
    public string ConfirmPassword { get; init; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Birthdate is { } birthdate && birthdate >= DateOnly.FromDateTime(DateTime.UtcNow))
        {
            yield return new ValidationResult("Ngay sinh phai truoc ngay hien tai.", [nameof(Birthdate)]);
        }
    }
}
