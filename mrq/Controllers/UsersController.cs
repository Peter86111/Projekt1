using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mrq.DTOs;
using mrq.Models;
using mrq.Services;

namespace mrq.Controllers
{
    [Route("auth")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly WebstoreContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly TokenGenerator tokenGenerator;
        private readonly EmailService emailService; 
        
        public UsersController(
            WebstoreContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            TokenGenerator tokenGenerator,
            EmailService emailService) // ⬅️
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.tokenGenerator = tokenGenerator;
            this.emailService = emailService; // ⬅️
        }

        [HttpPost("register")]
        public async Task<ActionResult> AddNewUser([FromBody] RegisterRequestDto registerRequestDto)
        {
            var user = new ApplicationUser
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email
            };

            var result = await userManager.CreateAsync(user, registerRequestDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    result = "",
                    message = result.Errors.FirstOrDefault()?.Description ?? "Ismeretlen hiba"
                });
            }

            // Token generálása
            var roles = await userManager.GetRolesAsync(user);
            var token = tokenGenerator.GenerateToken(user, roles);

            // Email küldés
            try
            {
                var emailText = $"Kedves {registerRequestDto.UserName},\n\nKöszönjük, hogy regisztráltál!";
                var emailRequest = new EmailRequest
                {
                    To = registerRequestDto.Email,
                    Subject = "Sikeres regisztráció",
                    Body = emailText
                };

                await emailService.SendEmailAsync(emailRequest);
            }
            catch (Exception ex)
            {
                Console.WriteLine("⚠️ Email küldés nem sikerült (de regisztráció sikeres): " + ex.Message);                
            }

            return Ok(new
            {
                token,
                message = "Sikeres regisztráció és email elküldve."
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(LoginRequestDto loginRequestDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.NormalizedUserName == loginRequestDto.UserName.ToUpper());

            bool isValid = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (isValid)
            {
                var roles = await userManager.GetRolesAsync(user);
                var jwtToken = tokenGenerator.GenerateToken(user, roles);

                return Ok(new
                {
                    result = new { user.UserName, user.Email },
                    message = "Sikeres beléptetés.",
                    token = jwtToken
                });

            }

            return BadRequest(new { result = "", message = "Nem regisztrált.", token = "" });
        }

        [HttpPost("assignrole")]
        public async Task<ActionResult> AddRole(string UserName, string roleName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.NormalizedUserName == UserName.ToUpper());

            if (user != null)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }

                await userManager.AddToRoleAsync(user, roleName);

                return Ok(new { result = user, message = "Sikeres hozzárendelés." });
            }

            return BadRequest(new { result = "", message = "Sikertelen hozzárendelés." });
        }
    }
}