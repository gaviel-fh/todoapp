using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Entities;

// dotnet ef migrations add InitialMigration -o Data\Migrations
// dotnet ef database update
// docker run --name my-postgres-container -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=appuser -e POSTGRES_DB=todoapp -p 5432:5432 -d postgres

namespace TodoApp.Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
