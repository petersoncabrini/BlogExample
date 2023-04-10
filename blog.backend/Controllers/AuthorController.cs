using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using blog.backend.Context;
using blog.backend.DTOs.Author;
using blog.backend.models;
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

        [HttpPost("register")]
        public async Task<ActionResult> Register(AuthorRegisterDTO request)
        {
            if (ModelState.IsValid)
            {
                // Verifica se o email já está sendo utilizado
                var authorExists = await _context.Authors.FirstOrDefaultAsync(u => u.Email == request.Email);

                if (authorExists != null)
                    return BadRequest("Este email já está sendo utilizado por outro autor");


                // Cria um novo autor
                var author = new Author
                {
                    Id = Guid.NewGuid(),
                    Name = request.Name,
                    Email = request.Email,
                    IsActive = true
                };

                // Gera uma hash da senha usando BCrypt
                string hashedPassword = HashPassword(request.Password);

                author.Password = hashedPassword;

                // Adiciona o autor ao contexto do EF Core e salva no banco de dados
                _context.Authors.Add(author);
                await _context.SaveChangesAsync();

                return Ok();
            }
            else
                return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthorLoginDTO request)
        {
            // Verifica se o email e a senha correspondem a um autor existente
            var author = await _context.Authors.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (author == null || !VerifyPassword(request.Password, author.Password))
                return Unauthorized();

            // Cria um token JWT que pode ser usado para autenticar solicitações subsequentes do usuário
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, author.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
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