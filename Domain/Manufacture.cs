using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Manufacture
    {
        public Guid Id { get; set; }
        public string ManufacturerName { get; set; }
        public string Description { get; set; }
        public string CountryOfOrigin { get; set; }
    }
}