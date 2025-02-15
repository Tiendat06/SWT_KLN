using System.ComponentModel.DataAnnotations;

namespace Application
{
    public class PaginationRequest : IPaginationRequest
    {
        [Range(0, 100)]
        public virtual int Fetch { get; set; } = 10;

        [Range(1, int.MaxValue)]
        public virtual int Page { get; set; } = 1;
    }

    public class SearchRequestDto : ISearchRequestDto
    {
        public virtual string Keyword { get; set; }
    }
}
