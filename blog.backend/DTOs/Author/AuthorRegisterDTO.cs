using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog.backend.DTOs.Author
{
    public class AuthorRegisterDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}