﻿using FluentValidation;

namespace Application
{
    public class GetTopicResponse
    {
        public required Guid TopicId { get; set; }
        public string? Capture { get; set; }
        public string? Description { get; set; }
        public int? MediaTypeId { get; set; }
        public DateTime? CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }
        public List<GetTopicImagesResponse>? Images { get; set; }
        public List<GetTopicVideoLinkResponse>? Videos { get; set; }
    }

    public class GetTopicImagesResponse
    {
        public int Id { get; set; }
        public string? Capture { get; set; }
        public string? ImageLink { get; set; }
    }

    public class GetTopicVideoLinkResponse
    {
        public int Id { get; set; }
        public string? Capture { get; set; }
        public string? VideoLink { get; set; }
    }

    public class GetTopicMediaResponse
    {
        public List<GetTopicImagesResponse>? Images { get; set; }
        public List<GetTopicVideoLinkResponse>? Videos { get; set; }
    }

    //public class getTopicResponseValidator : AbstractValidator<GetTopicResponse>
    //{
    //    public getTopicResponseValidator()
    //    {

    //    }
    //}
}
