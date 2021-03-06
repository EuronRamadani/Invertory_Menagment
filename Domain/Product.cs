using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public string Sku { get; set; }
        // public string? ProductPhoto { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public DateTime? DateCreated { get; set; } = DateTime.Now;
        public DateTime? ExpirationDate { get; set; }
        public string CategoryName { get; set; }
        public string ManufactureName { get; set; }
        // public ProductStatus Status { get; set; } = ProductStatus.Pending;


        public ICollection<Product_Category> Product_Categories { get; set; }
    }
}