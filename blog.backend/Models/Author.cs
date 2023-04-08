using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog.backend.models
{
    public class Author
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
    }
}