using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.Entities;

namespace TodoApp.ApiTest
{
    public static class DbContextTestHelper
    {
        public static DataContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            var context = new DataContext(options);

            // Add test data
            context.TodoItems.Add(new TodoItem { Id = 1, Title = "Test item 1", IsCompleted = false });
            context.TodoItems.Add(new TodoItem { Id = 2, Title = "Test item 2", IsCompleted = true });
            context.SaveChanges();

            return context;
        }
    }
}
