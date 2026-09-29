namespace api.Model;

public interface ISoftDeletable
{
    DateTime? DeletedAt { get; set; }
}
