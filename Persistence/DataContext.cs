using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Product_Category>()
                .HasOne(b => b.Product)
                .WithMany(ba => ba.Product_Categories)
                .HasForeignKey(bi => bi.ProductId);

            builder.Entity<Product_Category>()
                .HasOne(b => b.Category)
                .WithMany(ba => ba.Product_Categories)
                .HasForeignKey(bi => bi.CategoryId);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Manufacture> Manufacturer { get; set; }
        public DbSet<Product_Category> Product_Categories { get; set; }

    }
}