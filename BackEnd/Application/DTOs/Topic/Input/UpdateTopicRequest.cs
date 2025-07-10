using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class UpdateTopicRequest
    {
        public string Capture { get; set; }
        public string? Description { get; set; }
        public int MediaTypeId { get; set; }
        public Guid UserId { get; set; }
        public List<GetTopicMediaRequest> TopicMedia { get; set; }
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
}
