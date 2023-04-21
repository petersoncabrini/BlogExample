using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using blog.backend.Context;
using blog.backend.DTOs.Comment;
using blog.backend.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace blog.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly BlogContext _context;

        public CommentController(BlogContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("list/{postId}")]
        public async Task<ActionResult<List<CommentResponseDTO>>> GetAllByPost(Guid postId)
        {
            var comments = await _context.Comments
                            .Include(x => x.Author)
                            .Where(x => x.PostId == postId)
                            .Select(x => new CommentResponseDTO(x)).ToListAsync();

            if (comments == null)
                return NotFound();

            return Ok(comments);
        }

        [Authorize]
        [HttpPost("save")]
        public async Task<ActionResult> Save(CommentDTO request)
        {
            var comment = new Comment();
            comment.AuthorId = request.AuthorId;
            comment.PostId = request.PostId;
            comment.Content = request.Content;
            comment.CreatedAt = DateTime.Now;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var dbComment = await _context.Comments.FindAsync(id);
            if (dbComment == null)
                return NotFound();

            _context.Comments.Remove(dbComment);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}