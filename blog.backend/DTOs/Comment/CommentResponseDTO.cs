using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog.backend.DTOs.Comment
{
    public class CommentResponseDTO
    {
        public CommentResponseDTO()
        {

        }

        public CommentResponseDTO(models.Comment comment)
        {
            Id = comment.Id.ToString();
            AuthorName = comment.Author.Name;
            CreatedAt = comment.CreatedAt.ToString("dd/MM/yyyy");
            Content = comment.Content;
        }

        public string Id { get; set; }
        public string AuthorName { get; set; }
        public string CreatedAt { get; set; }
        public string Content { get; set; }
    }
}