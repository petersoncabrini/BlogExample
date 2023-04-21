using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using blog.backend.Enums;

namespace blog.backend.DTOs.Post
{
    public class PostRequestDTO
    {
        public Guid Id { get; set; }
        public string? Image { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public Guid AuthorId { get; set; }
        public string CreatedAt { get; set; }
        public PostCategory Category { get; set; }
    }
}
