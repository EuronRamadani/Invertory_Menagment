using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Supplier
    {
        public Guid Id { get; set; }
        // public string SupplierPhotoURL { get; set; }
        public string SupplierName { get; set; }
        public string CountryOfOrigin { get; set; }
        public string Description { get; set; }
    }
}