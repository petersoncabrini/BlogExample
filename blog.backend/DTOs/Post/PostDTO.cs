using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using blog.backend.Enums;

namespace blog.backend.DTOs.Post
{
    public class PostDTO
    {
        public PostDTO()
        {

        }

        public PostDTO(models.Post post)
        {
            Id = post.Id.ToString();
            Image = post.Image;
            Title = post.Title;
            Description = post.Description;
            Content = post.Content;
            AuthorId = post.AuthorId.ToString();
            AuthorName = post.Author.Name;
            CreatedAt = post.CreatedAt.ToString("dd/MM/yyyy");
            Category = post.Category;
        }

        public string Id { get; set; }
        public string? Image { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string CreatedAt { get; set; }
        public PostCategory Category { get; set; }
    }
}
