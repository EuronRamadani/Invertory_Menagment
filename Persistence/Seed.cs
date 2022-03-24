using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Categories.Any()) return;

            var categories = new List<Category>
            {
                new Category
                {
                    CategoryName = "Birra Peja",
                    Description = "Pije Alkoholike Kosovare",

                },
                new Category
                {
                    CategoryName = "Sola",
                    Description = "Pije Jo-alkoholike Kosovare",

                },
                new Category
                {
                    CategoryName = "Coca cola",
                    Description = "Pije e famshme",

                },

            };

            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();

            //Manufactures
            if (context.Manufacturer.Any()) return;

            var manufactures = new List<Manufacture>
            {
                new Manufacture
                {
                    ManufacturerName = "Birra Peja",
                    Description = "Pije Alkoholike Kosovare",
                    CountryOfOrigin = "Peje",
                },
                new Manufacture
                {
                    ManufacturerName = "Sola",
                    Description = "Pije jo-alkoholike",
                    CountryOfOrigin = "Gjermani",
                },
                new Manufacture
                {
                    ManufacturerName = "Coca Cola",
                    Description = "blla blla",
                    CountryOfOrigin = "Amerike",
                },

            };

            await context.Manufacturer.AddRangeAsync(manufactures);
            await context.SaveChangesAsync();

            //Suppliers
            if (context.Suppliers.Any()) return;

            var suppliers = new List<Supplier>
            {
                new Supplier
                {
                    SupplierName = "Euron",
                    CountryOfOrigin = "Peje",
                    Description = "Best",
                },
                new Supplier
                {
                    SupplierName = "Roni",
                    CountryOfOrigin = "Prishtine",
                    Description = "good",
                },
                new Supplier
                {
                    SupplierName = "Loni",
                    CountryOfOrigin = "Ferizaj",
                    Description = "bad",
                },

            };

            await context.Suppliers.AddRangeAsync(suppliers);
            await context.SaveChangesAsync();

            //Products
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Sku= "Euron",
                    ProductName = "Peje",
                    Description = "Best",
                    Price = 5.2,
                    Quantity= 5,
                    ExpirationDate= DateTime.Now,
                    DateCreated = DateTime.Today,
                },
                new Product
                {
                    Sku= "Roni",
                    ProductName = "Pejed",
                    Description = "Besdt",
                    Price = 5.2,
                    Quantity= 5,
                    ExpirationDate= DateTime.Now,
                    DateCreated = DateTime.Today,
                },
                new Product
                {
                    Sku= "Loni",
                    ProductName = "Peje",
                    Description = "Best",
                    Price = 5.2,
                    Quantity= 5,
                    ExpirationDate= DateTime.Now,
                    DateCreated = DateTime.Today,
                },


            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();


        }
    }
}