using System.ComponentModel.DataAnnotations;

namespace TodoApp.Api.Entities
{
    public class TodoItem
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public required string Title { get; set; }
        [MaxLength(500)]
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now.ToUniversalTime();
        public DateTime? DueAt { get; set; }
        public DateTime? CompletedAt { get; set; } = null;
        public bool IsCompleted { get; set; } = false;
    }
}
