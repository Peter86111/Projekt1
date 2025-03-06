using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mrq.Models;

namespace mrq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            using (var context = new WebstoreContext())
            {
                var product = await context.Products.Include(x=> x.Category).ToListAsync();

                return Ok(new { result = product, message = "Sikeres lekérdezés." });
            }
        }
    }
}
