using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class PaginationResponseDto<T>(int _TotalCount, IEnumerable<T> _Items)
    {
        public int TotalCount { get; set; } = _TotalCount;
        public IEnumerable<T> Items { get; set; } = _Items;
    }
}
