namespace api.Lib.Type;

public static class MomoType
{
    public class QuickPayRequest {
        public string OrderInfo { get; set; } = string.Empty;
        public string PartnerCode { get; set; } = string.Empty;
        public string RedirectUrl { get; set; } = string.Empty;
        public string IpnUrl { get; set; } = string.Empty;
        public decimal amount { get; set; }
        public string OrderId { get; set; } = string.Empty;
        public string RequestId { get; set; } = string.Empty;

    }
}