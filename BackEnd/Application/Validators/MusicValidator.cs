using Application.DTOs.Music.Output;
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
    public class MusicValidator
    {
        private readonly IMusicService _musicService;
        public MusicValidator(IMusicService musicService)
        {
            _musicService = musicService;
        }
    }
}
