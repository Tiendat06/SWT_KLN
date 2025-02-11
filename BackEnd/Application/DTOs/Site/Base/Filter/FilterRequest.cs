using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Site.Base.Filter
{
    public class FilterRequest : PaginationRequest
    {
        /// <summary>
        /// Column is ordered by
        /// </summary>
        public string OrderBy { get; set; }

        /// <summary>
        /// is sort descending ?
        /// </summary>
        public bool IsSortDesc { get; set; }
    }
}
