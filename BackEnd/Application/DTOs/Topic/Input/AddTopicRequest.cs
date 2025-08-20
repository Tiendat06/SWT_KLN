using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class AddTopicRequest
    {
        public string Capture { get; set; }
        public string? Description { get; set; }
        public int MediaTypeId { get; set; }
        public Guid UserId { get; set; }
        public List<GetTopicMediaRequest> TopicMedia { get; set; }
    }

    public class AddTopicImageRequest
    {
        public int Id { get; set; }
        public string? Capture { get; set; }
        public IFormFile ImageLink { get; set; }
    }

    public class AddTopicVideoRequest
    {
        public int Id { get; set; }
        public string? Capture { get; set; }
        public IFormFile VideoLink { get; set; }
    }

    public class AddTopicMediaRequest
    {
        public Guid? TopicId { get; set; }
        public int MediaTypeId { get; set; }
        public Guid UserId { get; set; }
        public List<AddTopicImageRequest>? TopicImages { get; set; }
        public List<AddTopicVideoRequest>? TopicVideos { get; set; }
    }

    public class AddTopicRequestValidator : AbstractValidator<AddTopicRequest>
    {
        private const long MaxTotalSizeInBytes = 4L * 1024 * 1024 * 1024; // 4 GB size of upload

        public AddTopicRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
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

    public class AddTopicMediaRequestValidator : AbstractValidator<AddTopicMediaRequest>
    {
        private const long MaxTotalSizeInBytes = 4L * 1024 * 1024 * 1024; // 4 GB size of upload

        public AddTopicMediaRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.TopicId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicId"]))
                .NotEqual(Guid.Empty).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicId"]));

            RuleFor(x => x.MediaTypeId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]))
                .NotEqual(0).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEqual(Guid.Empty).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));

            // Ensure at least one of Images or Videos exists
            RuleFor(x => x)
                .Must(r =>
                {
                    var hasImages = r.TopicImages != null && r.TopicImages.Any(i => i.ImageLink != null);
                    var hasVideos = r.TopicVideos != null && r.TopicVideos.Any(v => v.VideoLink != null);

                    return hasImages || hasVideos;
                })
                .WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicMedia"]));

            // Ensure total size across both does not exceed 4GB
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
