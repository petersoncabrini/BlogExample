using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using blog.backend.Context;
using blog.backend.DTOs.Author;
using blog.backend.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace blog.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly BlogContext _context;
        private readonly IConfiguration _config;

        public AuthorController(BlogContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(AuthorRegisterDTO request)
        {
            if (ModelState.IsValid)
            {
                var authorExists = await _context.Authors.FirstOrDefaultAsync(u => u.Email == request.Email);

                if (authorExists != null)
                    return BadRequest("Este email já está sendo utilizado por outro autor");

                var author = new Author
                {
                    Id = Guid.NewGuid(),
                    Name = request.Name,
                    Email = request.Email,
                    IsActive = true
                };

                string hashedPassword = HashPassword(request.Password);

                author.Password = hashedPassword;

                _context.Authors.Add(author);
                await _context.SaveChangesAsync();

                return Ok();
            }
            else
                return BadRequest(ModelState);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthorLoginDTO request)
        {
            try
            {
                var author = await _context.Authors.FirstOrDefaultAsync(u => u.Email == request.Email);

                if (author == null || !VerifyPassword(request.Password, author.Password))
                    return Unauthorized();

                // Cria um token JWT
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_config["Jwt:SecretKey"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, author.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Issuer = _config["Jwt:Issuer"],
                    Audience = _config["Jwt:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);

                return Ok(new
                {
                    Id = author.Id,
                    Name = author.Name,
                    Email = author.Email,
                    Token = tokenHandler.WriteToken(token)
                });
            }
            catch (System.Exception ex)
            {
                throw ex;
            }

        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }



}