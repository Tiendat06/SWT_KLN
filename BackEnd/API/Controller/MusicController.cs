using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.DTOs.Music.Output;
using API.Controller.Base;
using Application.Validators;
using static System.Net.Mime.MediaTypeNames;
using System.Net;
using Application.DTOs.Site.Output;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : KLNBaseController
    {
        private readonly IMusicService _musicService;
        //private readonly ILogMusicService logMusicService;
        private readonly IMusicValidator _musicValidator;
        public MusicController(IMusicService musicService, IMusicValidator musicValidator)
        {
            _musicService = musicService;
            _musicValidator = musicValidator;
        }
        // GET: api/Music
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<IEnumerable<GetMusicResponse>>))]
        public async Task<IActionResult> GetAllMusic()
        {
            var music = await _musicService.GetAllMusicAsync();
            return ApiSuccess(music);
        }
        // GET: api/Music/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetMusicResponse>))]
        public async Task<IActionResult> GetMusicById(Guid id)
        {
            var music = await _musicService.GetMusicByIdAsync(id);
            return ApiSuccess(music);
        }

    }
}
