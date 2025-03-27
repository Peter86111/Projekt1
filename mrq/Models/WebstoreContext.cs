using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace mrq.Models;

public partial class WebstoreContext : IdentityDbContext<ApplicationUser>
{
    public WebstoreContext(DbContextOptions options) : base(options)
    {
    }

    protected WebstoreContext()
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ApplicationUser> Users { get; set; }


}
