using api.Model;

namespace api.Service;

public static class SoftDeleteService
{
    public static void Delete<T>(T entity) where T : ISoftDeletable
    {
        entity.DeletedAt = DateTime.UtcNow;
    }

    public static void Restore<T>(T entity) where T : ISoftDeletable
    {
        entity.DeletedAt = null;
    }

    public static bool IsDeleted<T>(T entity) where T : ISoftDeletable
    {
        return entity.DeletedAt.HasValue;
    }
}
