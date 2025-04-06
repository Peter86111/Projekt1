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

        // Id�pontok lek�r�se
        [HttpGet("appointments")]
        [AllowAnonymous]
        public IActionResult GetAppointments()
        {
            var appointments = _context.Appointments.ToList(); // Lek�rj�k az �sszes foglal�st
            return Ok(appointments); // V�lasz visszaad�sa JSON form�tumban
        }

        // Id�pont foglal�sa
        [HttpPost("book")]
        [AllowAnonymous]
        public async Task<IActionResult> Book([FromBody] AppointmentRequestDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // Ha hib�s az input, visszaadja a valid�ci�s hib�kat
            }

            // Ellen�rizz�k, hogy az id�pont m�r foglalt-e
            var existingAppointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.Date == model.Date);

            if (existingAppointment != null)
            {
                return BadRequest("Ez az id�pont m�r foglalt.");
            }

            // Id�pont foglal�sa
            var appointment = new Appointment
            {
                Name = model.Name,
                Email = model.Email,
                Date = model.Date,
            };

            // Hozz�adjuk az adatb�zishoz
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            // Visszaigazol� email k�ld�se
            SendConfirmationEmail(model.Email, appointment.Date);

            var response = new AppointmentResponseDto
            {
                Id = appointment.Id,
                Date = appointment.Date,
                UserEmail = appointment.Email
            };

            return Ok(response); // JSON v�lasz
        }

        // Id�pont t�rl�se
        [HttpDelete("appointments/{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound("Foglal�s nem tal�lhat�.");
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent(); // T�rl�s sikeresen v�grehajtva
        }

        // Id�pont visszaigazol� email k�ld�se
        private void SendConfirmationEmail(string toEmail, DateTime appointmentDate)
        {
            var smtpHost = _configuration["Email:SmtpHost"];
            var smtpPort = _configuration["Email:SmtpPort"];
            var senderEmail = _configuration["Email:SenderEmail"];
            var senderPassword = _configuration["Email:SenderPassword"];

            if (string.IsNullOrEmpty(smtpPort) || string.IsNullOrEmpty(smtpHost) || string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(senderPassword))
            {
                throw new ArgumentException("SMTP be�ll�t�sok hi�nyosak.");
            }

            var smtpClient = new SmtpClient(smtpHost)
            {
                Port = int.Parse(smtpPort),  // SMTP port be�ll�t�sa
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(senderEmail),
                Subject = "Id�pont visszaigazol�s l�zertiszt�t�sra",
                Body = $"K�sz�nj�k, hogy minket v�lasztott�l! V�runk szeretettel: {appointmentDate:yyyy-MM-dd HH:mm}",
                IsBodyHtml = false,
            };

            mailMessage.To.Add(toEmail);

            smtpClient.Send(mailMessage);
        }
    }
}