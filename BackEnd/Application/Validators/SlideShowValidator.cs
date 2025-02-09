using Application.DTOs.SlideShow.Output;
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
    public class SlideShowValidator
    {
        private readonly ISlideShowService _slideShowService;
        public SlideShowValidator(ISlideShowService slideShowService)
        {
            _slideShowService = slideShowService;
        }

    }
}
