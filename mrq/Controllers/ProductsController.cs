using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mrq.DTOs;
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

    // GET: api/Categories/5/products
    [HttpGet("{id}/products")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsForCategory(int id)
    {
        var category = await _context.Categories
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
            return NotFound();

        return Ok(category.Products);
    }

    // POST: api/Products
    [HttpPost]
    public async Task<ActionResult> AddNewProduct([FromBody] CreateProductDto createProductDto)
    {
        // Ellenőrizzük, hogy létezik-e a kategória
        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == createProductDto.CategoryId);
        if (!categoryExists)
        {
            return BadRequest(new { message = "Nem létező kategória." });
        }

        // Létrehozzuk az új product entitást
        var product = new Product
        {
            Name = createProductDto.Name,
            Price = createProductDto.Price,
            Description = createProductDto.Description,
            CategoryId = createProductDto.CategoryId,
            Picture = createProductDto.Picture
        };

        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();

        return StatusCode(201, new { result = product, message = "Sikeres felvétel." });
    }

    // GET: api/Products/ById?id=123  (vagy ha REST-esebb utat szeretnél: [HttpGet("{id}")])
    [HttpGet("ById")]
    public async Task<ActionResult> GetProduct(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
        if (product == null)
            return NotFound(new { result = "", message = "Nincs ilyen termék az adatbázisban." });

        return Ok(new { result = product, message = "Sikeres találat." });
    }

    // DELETE: api/Products?id=123
    [HttpDelete]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound(new { result = "", message = "Nincs ilyen termék az adatbázisban." });

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return Ok(new { result = product, message = "Sikeres törlés." });
    }

    // PUT: api/Products?id=123
    [HttpPut]
    public async Task<ActionResult> UpdateProduct(int id, [FromBody] UpdateProductDto updateProductDto)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound(new { result = "", message = "Nincs ilyen termék az adatbázisban." });

        product.Name = updateProductDto.Name;
        product.Price = updateProductDto.Price;
        product.Description = updateProductDto.Description;
        product.CategoryId = updateProductDto.CategoryId;
        product.Picture = updateProductDto.Picture;

        _context.Products.Update(product);
        await _context.SaveChangesAsync();

        return Ok(new { result = product, message = "Sikeres frissítés." });
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
                // Ha a Picture "http"‐val kezdődik, azt hagyjuk,
                // különben előtagoljuk a linket (példa).
                Picture = p.Picture.StartsWith("http")
                    ? p.Picture
                    : $"https://pro2025.nhely.hu/img/{p.Picture}",
                Category = p.Category.CategoryName
            })
            .ToListAsync();

        return Ok(new { result = products, message = "Sikeres lekérdezés." });
    }
}