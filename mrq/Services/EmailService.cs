using mrq.Models;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration; // FONTOS ha nincs meg

namespace mrq.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<bool> SendEmailAsync(EmailRequest request)
        {
            try
            {
                var smtpClient = new SmtpClient
                {
                    Host = _config["Email:SmtpHost"],
                    Port = int.Parse(_config["Email:SmtpPort"] ?? "587"),
                    EnableSsl = true,
                    Credentials = new NetworkCredential(
                        _config["Email:SenderEmail"],
                        _config["Email:SenderPassword"]
                    )
                };

                var mail = new MailMessage
                {
                    From = new MailAddress(_config["Email:SenderEmail"]),
                    Subject = request.Subject,
                    Body = request.Body,
                    IsBodyHtml = false
                };
                mail.To.Add(request.To);

                await smtpClient.SendMailAsync(mail);
                Console.WriteLine("✔ Email sikeresen elküldve.");
                return true;
            }
            //catch (Exception ex)
            //{
            //    Console.WriteLine("❌ Email küldési hiba: " + ex.ToString());
            //    return false;
            //}
            catch (Exception ex)
            {
                Console.WriteLine("❌ Email küldési hiba: " + ex.ToString());
                throw; // ideiglenesen dobd tovább a hibát, hogy lásd mi történik!
            }
        }
    }
}