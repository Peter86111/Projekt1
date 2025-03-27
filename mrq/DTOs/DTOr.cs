using Microsoft.AspNetCore.Mvc;

namespace mrq.DTOs

{
    public record RegisterRequestDto(string UserName, string Password, string Email, DateTime BirthDate);
    public record LoginRequestDto(string UserName, string Password);
    public record CreateProductDto(string Name, int Price, string Description, int CategoryId, string? Picture);
    public record UpdateProductDto(string Name, int Price, string Description, int CategoryId, string? Picture);
}