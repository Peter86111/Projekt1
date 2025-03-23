using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mrq.Models;
using mrq.DTOs;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly WebstoreContext _context;

    public ProductsController(WebstoreContext context)
    {
        _context = context;
    }


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

    [HttpPost]
    public async Task<ActionResult> AddNewProduct(CreateProductDto createProductDto)
    {
        using (var context = new WebstoreContext())
        {
            // Check if the category exists
            var categoryExists = await context.Categories.AnyAsync(c => c.Id == createProductDto.CategoryId);
            if (!categoryExists)
            {
                return BadRequest(new { message = "Nem létező kategória." });
            }

            var product = new Product
            {
                Name = createProductDto.Name,
                Price = createProductDto.Price,
                Description = createProductDto.Description,
                CategoryId = createProductDto.CategoryId,
                Picture = createProductDto.Picture
            };

            await context.Products.AddAsync(product);
            await context.SaveChangesAsync();

            return StatusCode(201, new { result = product, message = "Sikeres felvétel." });
        }
    }

    [HttpGet("ById")]
    public async Task<ActionResult> GetProduct(int id)
    {
        using (var context = new WebstoreContext())
        {
            var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (product != null)
            {
                return Ok(new { result = product, message = "Sikere találat." });
            }

            return NotFound(new { result = "", message = "Nincs ilyen auto az adatbázisban." });
        }

    }

    [HttpDelete]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        using (var context = new WebstoreContext())
        {
            var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (product != null)
            {
                context.Products.Remove(product);
                context.SaveChanges();

                return Ok(new { result = product, message = "Sikere törlés." });
            }

            return NotFound(new { result = "", message = "Nincs ilyen auto az adatbázisban." });
        }

    }

    [HttpPut]
    public async Task<ActionResult> UpdateProduct(int id, UpdateProductDto updateProductDto)
    {
        using (var context = new WebstoreContext())
        {
            var existingProduct = await context.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (existingProduct != null)
            {
                existingProduct.Name = updateProductDto.Name;
                existingProduct.Price = updateProductDto.Price;
                existingProduct.Description = updateProductDto.Description;
                existingProduct.CategoryId = updateProductDto.CategoryId;
                existingProduct.Picture= updateProductDto.Picture;


                context.Products.Update(existingProduct);
                context.SaveChanges();

                return Ok(new { result = existingProduct, message = "Sikere frissítés." });
            }

            return NotFound(new { result = "", message = "Nincs ilyen auto az adatbázisban." });
        }
    }
        [HttpGet]

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

}


