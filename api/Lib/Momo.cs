using System.Security.Cryptography;
using System.Text;
using api.Lib.Setting;
using Microsoft.Extensions.Options;

namespace api.Lib;

public class Momo
{
    private readonly MomoSetting _setting;

    public Momo(IOptions<MomoSetting> options)
    {
        this._setting = options.Value;
    }

    public void CreateOrder(string uuid, string content, int value)
    {
        
    }

    public void ReOrder()
    {

    }

    public void Refund()
    {

    }

    private static string getSignature(string text, string key)
    {
        ASCIIEncoding encoding = new ASCIIEncoding();

        Byte[] textBytes = encoding.GetBytes(text);
        Byte[] keyBytes = encoding.GetBytes(key);

        Byte[] hashBytes;

        using (HMACSHA256 hash = new HMACSHA256(keyBytes)) hashBytes = hash.ComputeHash(textBytes);

        return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
    }

}