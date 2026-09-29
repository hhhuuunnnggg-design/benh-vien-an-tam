using System.ComponentModel.DataAnnotations;

namespace api.Contract.Auth;

public sealed class LoginRequest
{
    [Required(ErrorMessage = "So dien thoai la bat buoc.")]
    [RegularExpression(@"^(?:\+84|0)(?:3|5|7|8|9)\d{8}$", ErrorMessage = "So dien thoai Viet Nam khong hop le.")]
    public string Phone { get; init; } = string.Empty;

    [Required(ErrorMessage = "Mat khau la bat buoc.")]
    [StringLength(128, MinimumLength = 8, ErrorMessage = "Mat khau phai tu 8 den 128 ky tu.")]
    public string Password { get; init; } = string.Empty;
}
