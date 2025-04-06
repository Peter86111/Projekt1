using Microsoft.AspNetCore.Mvc;

namespace mrq.DTOs

{
    public record RegisterRequestDto(string UserName, string Password, string Email);
    public record LoginRequestDto(string UserName, string Password);
    public record CreateProductDto(string Name, int Price, string Description, int CategoryId, string? Picture);
    public record UpdateProductDto(string Name, int Price, string Description, int CategoryId, string? Picture);

    public class AppointmentResponseDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string UserEmail { get; set; } = string.Empty;
    }
    public class AppointmentRequestDto
    {
        public DateTime Date { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
