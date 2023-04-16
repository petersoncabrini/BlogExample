using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog.backend.DTOs.Comment
{
    public class CommentDTO
    {
        public CommentDTO()
        {

        }

        public Guid AuthorId { get; set; }
        public Guid PostId { get; set; }
        public string Content { get; set; }
    }
}