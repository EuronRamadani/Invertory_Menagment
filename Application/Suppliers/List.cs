using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Suppliers
{
    public class List
    {
        public class Query : IRequest<List<Supplier>>
        {

        }

        public class Handler : IRequestHandler<Query, List<Supplier>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Supplier>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Suppliers.ToListAsync();
            }
        }
    }
}