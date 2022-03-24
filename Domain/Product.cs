using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Sku { get; set; }
        public string ProductName { get; set; }
        // public string? ProductPhoto { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? DateCreated { get; set; } = DateTime.Now;
        // public ProductStatus Status { get; set; } = ProductStatus.Pending;
    }
}