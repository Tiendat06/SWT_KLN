using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class DeleteSlideShowsRequest
    {
        public List<Guid> Ids { get; set; } = new List<Guid>();
    }
}
