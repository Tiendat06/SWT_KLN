using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class UpdateTopicRequest
    {
        public string Capture { get; set; }
        public string? Description { get; set; }
        public int MediaTypeId { get; set; }
        public Guid UserId { get; set; }
        public List<GetTopicMediaRequest>? TopicMedia { get; set; }
    }

    public class UpdateTopicMediaRequest
    {
        public Guid? TopicId { get; set; }
        public int MediaTypeId { get; set; }
        public Guid UserId { get; set; }
        //public List<int>? ImageIds { get; set; }
        //public List<int>? VideoIds { get; set; }
        public List<GetTopicImageRequest>? TopicImages { get; set; }
        public List<GetTopicVideoRequest>? TopicVideos { get; set; }
    }

    public class UpdateTopicImageRequest
    {
        public int Id { get; set; }
        public string? Capture { get; set; }
        public IFormFile? ImageLink { get; set; }
    }

    public class UpdateTopicVideoRequest
    {
        public int Id { get; set; }
        public string? Capture { get; set; }
        public IFormFile? VideoLink { get; set; }
    }

    public class UpdateTopicRequestValidator : AbstractValidator<UpdateTopicRequest>
    {
        private const long MaxTotalSizeInBytes = 4L * 1024 * 1024 * 1024; // 4 GB size of upload
        public UpdateTopicRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            //RuleFor(x => x.TopicMedia)
            //    .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicCapture"]))
            //    .Must(images => images.Count < 4)
            //        .WithMessage(CommonExtensions.GetValidateMessage(localizer["MaxItems"], localizer["TopicImage"], 3));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEqual(Guid.Empty).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));

            RuleFor(x => x)
                .Must(request =>
                {
                    long totalSize = 0;

                    if (request.TopicMedia != null)
                    {
                        totalSize += request.TopicMedia
                            .Where(i => i.MediaLink != null)
                            .Sum(i => i.MediaLink.Length);
                    }

                    if (request.TopicMedia != null)
                    {
                        totalSize += request.TopicMedia
                            .Where(v => v.MediaLink != null)
                            .Sum(v => v.MediaLink.Length);
                    }

                    return totalSize <= MaxTotalSizeInBytes;
                })
                .WithMessage(CommonExtensions.GetValidateMessage(localizer["MaxFileSize"], "4GB"));
        }
    }

    public class UpdateTopicMediaRequestValidator : AbstractValidator<UpdateTopicMediaRequest>
    {
        private const long MaxTotalSizeInBytes = 4L * 1024 * 1024 * 1024; // 4 GB size of upload
        public UpdateTopicMediaRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.TopicId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicId"]))
                .NotEqual(Guid.Empty).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicId"]));

            RuleFor(x => x.MediaTypeId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]))
                .GreaterThan(0).WithMessage(CommonExtensions.GetValidateMessage(localizer["GreaterThanZero"], localizer["MediaTypeId"]));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEqual(Guid.Empty).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));

            RuleFor(x => x.TopicImages)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicImage"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicImage"]));

            RuleFor(x => x.TopicVideos)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicVideo"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicVideo"]));

            RuleFor(x => x)
                .Must(request =>
                {
                    long totalSize = 0;

                    if (request.TopicImages != null)
                    {
                        totalSize += request.TopicImages
                            .Where(i => i.ImageLink != null)
                            .Sum(i => i.ImageLink.Length);
                    }

                    if (request.TopicVideos != null)
                    {
                        totalSize += request.TopicVideos
                            .Where(v => v.VideoLink != null)
                            .Sum(v => v.VideoLink.Length);
                    }

                    return totalSize <= MaxTotalSizeInBytes;
                })
                .WithMessage(CommonExtensions.GetValidateMessage(localizer["MaxFileSize"], "4GB"));
        }
    }
}
