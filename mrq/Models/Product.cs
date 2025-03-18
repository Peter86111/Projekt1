using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace mrq.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? Price { get; set; }

    public int? CategoryId { get; set; }
    public string? Picture { get; set; }

    [JsonIgnore]

    public virtual Category? Category { get; set; }
}
