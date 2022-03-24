using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Suppliers;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class SuppliersController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Supplier>>> GetSuppliers()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateSupplier(Supplier supplier)
        {
            return Ok(await Mediator.Send(new Create.Command { Supplier = supplier }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSupplier(Guid id, Supplier supplier)
        {
            supplier.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Supplier = supplier }));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteSupplier(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}