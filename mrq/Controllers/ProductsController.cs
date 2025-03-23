using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mrq.Models;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly WebstoreContext _context;

    public ProductsController(WebstoreContext context)
    {
        _context = context;
    }

    // GET: api/Products
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

    // GET: api/Categories/5/products
    [HttpGet("{id}/products")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsForCategory(int id)
    {
        var category = await _context.Categories
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
        {
            return NotFound();
        }

        // Ha van beállítva a reláció: c.Products
        // Vagy explicit lekérdezéssel:
        // var products = await _context.Products.Where(p => p.CategoryId == id).ToListAsync();
        return Ok(category.Products);
    }
}

