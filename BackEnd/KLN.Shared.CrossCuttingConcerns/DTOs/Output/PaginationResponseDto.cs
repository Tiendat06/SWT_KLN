namespace KLN.Shared.CrossCuttingConcerns
{
    public class PaginationResponseDto<T>(int _TotalCount, IEnumerable<T> _Items)
    {
        public int TotalCount { get; set; } = _TotalCount;
        public IEnumerable<T> Items { get; set; } = _Items;
    }
}
