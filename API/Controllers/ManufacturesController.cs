using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ManufacturesController : BaseApiController
    {
        private readonly DataContext _context;
        public ManufacturesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Manufacture>>> GetManufactures()
        {
            return await _context.Manufacturer.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Manufacture>> GetManufacture(Guid id)
        {
            return await _context.Manufacturer.FindAsync(id);
        }

    }
}