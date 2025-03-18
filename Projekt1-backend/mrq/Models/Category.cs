using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace mrq.Models;

public partial class Category
{
    public int Id { get; set; }

    public string? CategoryName { get; set; }

    [JsonIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
