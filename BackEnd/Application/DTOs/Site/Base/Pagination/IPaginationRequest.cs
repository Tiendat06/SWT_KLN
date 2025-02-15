namespace Application
{
    public interface IPaginationRequest
    {
        /// <summary>
        /// number of rows
        /// </summary>
        public int Fetch {  get; set; }

        /// <summary>
        /// skipped rows
        /// </summary>
        public int Page {  get; set; }
    }

    public interface ISearchRequestDto
    {
        public string Keyword { get; set; }
    }
}
