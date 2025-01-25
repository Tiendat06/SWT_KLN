using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Site.Output
{
    public class CustomResponse<T>
    {
        public int? status { get; set; }
        public T? data { get; set; }
        public string? message { get; set; }
    }
}
