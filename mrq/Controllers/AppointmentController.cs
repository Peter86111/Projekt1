namespace mrq.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using System.Net.Mail;
    using mrq.Models;
    using System.Net;
    using System.Security.Claims;
    using mrq.DTOs;
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;
    using System;

    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly WebstoreContext _context;
        private readonly IConfiguration _configuration;

        public AppointmentController(WebstoreContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Idõpontok lekérése
        [HttpGet("appointments")]
        [AllowAnonymous]
        public IActionResult GetAppointments()
        {
            var appointments = _context.Appointments.ToList(); // Lekérjük az összes foglalást
            return Ok(appointments); // Válasz visszaadása JSON formátumban
        }

        // Idõpont foglalása
        [HttpPost("book")]
        [AllowAnonymous]
        public async Task<IActionResult> Book([FromBody] AppointmentRequestDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // Ha hibás az input, visszaadja a validációs hibákat
            }

            // Ellenõrizzük, hogy az idõpont már foglalt-e
            var existingAppointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.Date == model.Date);

            if (existingAppointment != null)
            {
                return BadRequest("Ez az idõpont már foglalt.");
            }

            // Idõpont foglalása
            var appointment = new Appointment
            {
                Name = model.Name,
                Email = model.Email,
                Date = model.Date,
            };

            // Hozzáadjuk az adatbázishoz
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            // Visszaigazoló email küldése
            SendConfirmationEmail(model.Email, appointment.Date);

            var response = new AppointmentResponseDto
            {
                Id = appointment.Id,
                Date = appointment.Date,
                UserEmail = appointment.Email
            };

            return Ok(response); // JSON válasz
        }

        // Idõpont törlése
        [HttpDelete("appointments/{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound("Foglalás nem található.");
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent(); // Törlés sikeresen végrehajtva
        }

        // Idõpont visszaigazoló email küldése
        private void SendConfirmationEmail(string toEmail, DateTime appointmentDate)
        {
            var smtpHost = _configuration["Email:SmtpHost"];
            var smtpPort = _configuration["Email:SmtpPort"];
            var senderEmail = _configuration["Email:SenderEmail"];
            var senderPassword = _configuration["Email:SenderPassword"];

            if (string.IsNullOrEmpty(smtpPort) || string.IsNullOrEmpty(smtpHost) || string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(senderPassword))
            {
                throw new ArgumentException("SMTP beállítások hiányosak.");
            }

            var smtpClient = new SmtpClient(smtpHost)
            {
                Port = int.Parse(smtpPort),  // SMTP port beállítása
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(senderEmail),
                Subject = "Idõpont visszaigazolás lézertisztításra",
                Body = $"Köszönjük, hogy minket választottál! Várunk szeretettel: {appointmentDate:yyyy-MM-dd HH:mm}",
                IsBodyHtml = false,
            };

            mailMessage.To.Add(toEmail);

            smtpClient.Send(mailMessage);
        }
    }
}