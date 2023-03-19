using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Controllers;
using TodoApp.Api.Entities;

namespace TodoApp.ApiTest
{
    public class TodoItemsControllerTests
    {
        [Fact]
        public async Task GetTodoItems_ReturnsAllItems()
        {
            // Arrange
            var context = DbContextTestHelper.GetInMemoryDbContext();
            var controller = new TodoItemsController(context);

            // Act
            var result = await controller.GetTodoItems();

            // Assert
            Assert.Equal(2, result.Value.Count());
        }

        [Fact]
        public async Task GetTodoItem_ReturnsItem_WhenIdExists()
        {
            // Arrange
            var context = DbContextTestHelper.GetInMemoryDbContext();
            var controller = new TodoItemsController(context);
            int existingItemId = 1;

            // Act
            var result = await controller.GetTodoItem(existingItemId);

            // Assert
            Assert.IsType<ActionResult<TodoItem>>(result);
            Assert.Equal(existingItemId, result.Value.Id);
        }

        [Fact]
        public async Task GetTodoItem_ReturnsNotFound_WhenIdDoesNotExist()
        {
            // Arrange
            var context = DbContextTestHelper.GetInMemoryDbContext();
            var controller = new TodoItemsController(context);
            int nonExistentItemId = 999;

            // Act
            var result = await controller.GetTodoItem(nonExistentItemId);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
