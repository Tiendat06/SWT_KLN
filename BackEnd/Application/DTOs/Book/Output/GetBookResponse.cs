namespace Application
{
    public class GetBookResponse
    {
        public Guid BookId { get; set; }
        public string Title { get; set; }
        public string BookContent { get; set; }
        public string Publisher { get; set; }
        public string Author { get; set; }
        public string YearPublic { get; set; }
        public int? MediaTypeId { get; set; }
        public string? Description { get; set; }
        public string Image { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
    }
}
