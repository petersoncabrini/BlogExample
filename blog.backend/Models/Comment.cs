using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog.backend.models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid AuthorId { get; set; }
        public virtual Author Author { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid PostId { get; set; }
        public virtual Post Post { get; set; }
    }
}