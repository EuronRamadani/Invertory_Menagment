using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Suppliers
{
    public class Details
    {
        public class Query : IRequest<Supplier>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Supplier>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Supplier> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Suppliers.FindAsync(request.Id);
            }
        }
    }
}