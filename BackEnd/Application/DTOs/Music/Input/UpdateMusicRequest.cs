using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class UpdateMusicRequest
    {
        public string Title { get; set; }
        public int MediaTypeId { get; set; }
        public string Author { get; set; }
        public IFormFile? ImageLink { get; set; }
        public IFormFile? AudioLink { get; set; }
        public Guid UserId { get; set; }
    }

    public class UpdateMusicRequestValidator : AbstractValidator<UpdateMusicRequest>
    {
        public UpdateMusicRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MusicTitle"]))
                //.NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MusicTitle"]))
                .MaximumLength(MusicConsts.MaxTitleLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["MusicTitle"], MusicConsts.MaxTitleLength
                ));
            RuleFor(x => x.Author)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MusicAuthor"]));
                //.NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MusicAuthor"]
                //));
            RuleFor(x => x.ImageLink)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MusicImage"]));
                //.NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MusicImage"]));
            RuleFor(x => x.AudioLink)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MusicAudio"]));
                //.NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MusicAudio"]));
            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));
            RuleFor(x => x.MediaTypeId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]));
        }
    }
}
