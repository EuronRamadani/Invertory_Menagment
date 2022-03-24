using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Suppliers
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Supplier Supplier { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var supplier = await _context.Suppliers.FindAsync(request.Supplier.Id);

                _mapper.Map(request.Supplier, supplier);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}