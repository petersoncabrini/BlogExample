using blog.backend.Context;
using blog.backend.DTOs.Post;
using blog.backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace blog.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {

        private readonly BlogContext _context;

        public PostController(BlogContext context)
        {
            _context = context;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<PostDTO>>> GetAll()
        {
            var posts = await _context.Posts
                            .Include(x => x.Author)
                            .Select(x => new PostDTO(x)).ToListAsync();

            if (posts == null)
                return NotFound();

            return posts;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> Get(Guid id)
        {
            var post = await _context.Posts
                            .Include(x => x.Author)
                            .Where(x => x.Id == id)
                            .Select(x => new PostDTO(x)).FirstOrDefaultAsync();

            if (post == null)
                return NotFound();

            return post;
        }

    }

}



