using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Controllers;
using TodoApp.Api.Data;
using TodoApp.Api.Entities;

namespace TodoApp.ApiTest
{
    public class TodoItemsControllerTests : IDisposable
    {
        private readonly DataContext _context;
        private readonly TodoItemsController _controller;

        public TodoItemsControllerTests()
        {
            _context = DbContextTestHelper.GetInMemoryDbContext();
            _controller = new TodoItemsController(_context);
        }

        public void Dispose()
        {
            DbContextTestHelper.ClearContext(_context);
            _context.Dispose();
        }

        [Fact]
        public async Task GetTodoItems_ReturnsAllItems()
        {
            // Act
            var result = await _controller.GetTodoItems();

            // Assert
            Assert.Equal(2, result.Value.Count());
        }

        [Fact]
        public async Task GetTodoItem_ReturnsItem_WhenIdExists()
        {
            // Arrange
            int existingItemId = 1;

            // Act
            var result = await _controller.GetTodoItem(existingItemId);

            // Assert
            Assert.IsType<ActionResult<TodoItem>>(result);
            Assert.Equal(existingItemId, result.Value.Id);
        }

        [Fact]
        public async Task GetTodoItem_ReturnsNotFound_WhenIdDoesNotExist()
        {
            // Arrange
            int nonExistentItemId = 999;

            // Act
            var result = await _controller.GetTodoItem(nonExistentItemId);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
