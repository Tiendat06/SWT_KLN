namespace KLN.Shared.CrossCuttingConcerns
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
