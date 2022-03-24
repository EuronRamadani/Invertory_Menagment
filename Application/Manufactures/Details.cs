using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Manufactures
{
    public class Details
    {
        public class Query : IRequest<Manufacture>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Manufacture>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Manufacture> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Manufacturer.FindAsync(request.Id);
            }
        }
    }
}