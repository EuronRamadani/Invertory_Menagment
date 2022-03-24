using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Category, Category>();
            CreateMap<Manufacture, Manufacture>();
            CreateMap<Product, Product>();
            CreateMap<Supplier, Supplier>();
        }
    }
}