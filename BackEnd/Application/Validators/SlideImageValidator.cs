using Application.DTOs.SlideImage.Output;
using Application.Interfaces;
using FluentValidation.Results;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public class SlideImageValidator
    {
        private readonly ISlideImageService _slideImageService;
        public SlideImageValidator(ISlideImageService slideImageService)
        {
            _slideImageService = slideImageService;
        }
    }
}
