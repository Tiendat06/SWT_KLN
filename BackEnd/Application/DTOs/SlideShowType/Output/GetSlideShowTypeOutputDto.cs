using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class GetSlideShowTypeOutputDto
    {
        public int SlideShowTypeId { get; set; }
        public string SlideShowTypeName { get; set; }
        public string? SlideShowDescription { get; set; }
    }
}
