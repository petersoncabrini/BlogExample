using blog.backend.Context;
using blog.backend.DTOs.Post;
using blog.backend.models;
using Microsoft.AspNetCore.Authorization;
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

        [AllowAnonymous]
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

        [AllowAnonymous]
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

        [Authorize]
        [HttpPost("save")]
        public async Task<ActionResult> Save(PostRequestDTO request)
        {
            var post = new Post();
            post.Id = request.Id;
            post.Image = request.Image;
            post.AuthorId = request.AuthorId;
            post.Title = request.Title;
            post.Description = request.Description;
            post.Content = request.Content;
            post.CreatedAt = DateTime.Now;
            post.Category = request.Category;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }

}



