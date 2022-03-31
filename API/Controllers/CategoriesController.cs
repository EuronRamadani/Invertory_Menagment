using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Categories;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]

        public async Task<IActionResult> CreateCategory(Category category)
        {
            return Ok(await Mediator.Send(new Create.Command { Category = category }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCategory(Guid id, Category category)
        {
            category.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Category = category }));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }


    }
}