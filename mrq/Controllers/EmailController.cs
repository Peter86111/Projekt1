using Microsoft.AspNetCore.Mvc;
using mrq.Models;
using mrq.Services;

namespace mrq.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            if (string.IsNullOrEmpty(request.To) || string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Body))
            {
                return BadRequest("Hiányzó adat a kérésben.");
            }

            var result = await _emailService.SendEmailAsync(request);
            if (result)
                return Ok(new { message = "Email sikeresen elküldve." });

            return StatusCode(500, "Nem sikerült elküldeni az emailt.");
        }
    }
}
