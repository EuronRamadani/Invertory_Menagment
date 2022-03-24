using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Manufactures;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ManufacturesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Manufacture>>> GetManufactures()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Manufacture>> GetManufacture(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateManufacture(Manufacture manufacture)
        {
            return Ok(await Mediator.Send(new Create.Command { Manufacture = manufacture }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditManufacture(Guid id, Manufacture manufacture)
        {
            manufacture.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Manufacture = manufacture }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManufacture(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}