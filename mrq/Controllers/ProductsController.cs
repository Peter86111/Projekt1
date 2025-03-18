using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mrq.Models;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly WebstoreContext _context;

    public ProductsController(WebstoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var products = await _context.Products
            .Include(p => p.Category)
            .Select(p => new
            {
                p.Id,
                p.Name,
                p.Price,
                Picture = p.Picture.StartsWith("http") ? p.Picture : $"https://pro2025.nhely.hu/img/{p.Picture}",

                Category = p.Category.CategoryName
            })
            .ToListAsync();

        return Ok(new { result = products, message = "Sikeres lekérdezés." });
    }
}

