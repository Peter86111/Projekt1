using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // Check if the category exists
        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == createProductDto.CategoryId);
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

        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();

        return StatusCode(201, new { result = product, message = "Sikeres felvétel." });

    }

    [HttpGet("ById")]
    public async Task<ActionResult> GetProduct(int id)
    {

        var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (product != null)
        {
            return Ok(new { result = product, message = "Sikere találat." });
        }

        return NotFound(new { result = "", message = "Nincs ilyen auto az adatbázisban." });


    }

    [HttpDelete]
    public async Task<ActionResult> DeleteProduct(int id)
    {

        var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (product != null)
        {
            _context.Products.Remove(product);
            _context.SaveChanges();

            return Ok(new { result = product, message = "Sikere törlés." });
        }

        return NotFound(new { result = "", message = "Nincs ilyen auto az adatbázisban." });
    }



    [HttpPut]
    public async Task<ActionResult> UpdateProduct(int id, UpdateProductDto updateProductDto)
    {

        var existingProduct = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (existingProduct != null)
        {
            existingProduct.Name = updateProductDto.Name;
            existingProduct.Price = updateProductDto.Price;
            existingProduct.Description = updateProductDto.Description;
            existingProduct.CategoryId = updateProductDto.CategoryId;
            existingProduct.Picture = updateProductDto.Picture;


            _context.Products.Update(existingProduct);
            _context.SaveChanges();

            return Ok(new { result = existingProduct, message = "Sikere frissítés." });
        }

        return NotFound(new { result = "", message = "Nincs ilyen auto az adatbázisban." });
    }


    // GET: api/Products
    //[Authorize]
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


