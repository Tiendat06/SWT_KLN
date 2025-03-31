namespace Application
{
    public class GetMagazineResponse
    {
        public Guid MagazineId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string? Description { get; set; }
        public int? MediaTypeId { get; set; }
        public string MagazineContent { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }
    }
}
