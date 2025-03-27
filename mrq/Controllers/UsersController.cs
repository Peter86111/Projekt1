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

        public UsersController(WebstoreContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, TokenGenerator tokenGenerator)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.tokenGenerator = tokenGenerator;
        }

        [HttpPost("register")]
        public async Task<ActionResult> AddNewUser(RegisterRequestDto registerRequestDto)
        {
            var user = new ApplicationUser
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email
            };

            var result = await userManager.CreateAsync(user, registerRequestDto.Password);

            if (result.Succeeded)
            {
                var userReturn = await _context.Users.FirstOrDefaultAsync(user => user.UserName == registerRequestDto.UserName);

                return Ok(new { result = userReturn, message = "Sikeres regisztráció." });
            }

            return BadRequest(new { result = "", message = result.Errors.FirstOrDefault().Description });
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

                return Ok(new { result = new { user.UserName, user.Email }, message = "Sikeres beléptetés.", token = jwtToken });
            }

            return BadRequest(new { result = "", message = "Nem regisztrált.", token = "" });
        }

        [HttpPost("assignrole")]
        public async Task<ActionResult> AddRole(string UserName, string roleName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.NormalizedUserName == UserName.ToUpper());

            if (user != null)
            {
                if (!roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
                {
                    roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
                }

                await userManager.AddToRoleAsync(user, roleName);

                return Ok(new { result = user, message = "Sikeres hozzárendelés." });
            }

            return BadRequest(new { result = "", message = "Sikertelen hozzárendelés." });
        }
    }
}
