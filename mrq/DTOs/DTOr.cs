using Microsoft.AspNetCore.Mvc;

namespace mrq.DTOs

{
    public record CreateProductDto(string Name, int Price, string Description, int CategoryId, string? Picture);
    public record UpdateProductDto(string Name, int Price, string Description, int CategoryId, string? Picture);
}