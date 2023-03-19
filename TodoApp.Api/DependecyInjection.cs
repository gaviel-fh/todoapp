using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;

namespace TodoApp.Api
{
    public static class DependecyInjection
    {
        public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MyPostgresConnection");

            services.AddDbContext<DataContext>(options => options.UseNpgsql(connectionString));

            services.AddControllers();
        }
    }
}
