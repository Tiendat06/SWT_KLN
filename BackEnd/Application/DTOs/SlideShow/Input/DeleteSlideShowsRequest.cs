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

    public class DeleteSlideImageRequest
    {
        public Guid SlideShowId { get; set; }
        public int MediaTypeId { get; set; }
        public Guid UserId { get; set; }
        public List<int> Ids { get; set; }
    }
}
