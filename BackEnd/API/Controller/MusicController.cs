using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using Application;
using KLN.Shared.CrossCuttingConcerns;
using System.Net;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController(
        IMusicService _musicService,
        IMusicValidator _musicValidator
        ) : KLNBaseController
    {
        // GET: api/Music/id
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetMusicResponse>))]
        public async Task<IActionResult> GetMusicById(Guid id)
        {
            var music = await _musicService.GetMusicByIdAsync(id);
            return ApiSuccess(music);
        }

        // GET: api/Music
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<PaginationResponseDto<GetMusicResponse>>))]
        public async Task<IActionResult> GetAllMusicAsync([FromQuery] GetMusicRequest input)
        {
            var music = await _musicService.GetAllMusicAsync(input);
            return ApiSuccess(music);
        }

        // POST: api/Music
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetMusicResponse>))]
        public async Task<IActionResult> CreateMusic([FromForm] AddMusicRequest addMusicRequest)
        {
            var musics = await _musicValidator.CreateMusicAsyncValidator(addMusicRequest);
            return ApiSuccess(musics, HttpStatusCode.Created);
        }

        // PUT: api/Music/id
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetMusicResponse>))]
        public async Task<IActionResult> UpdateMusic(Guid id, [FromForm] UpdateMusicRequest updateMusicRequest)
        {
            var musics = await _musicValidator.UpdateMusicAsyncValidator(id, updateMusicRequest);
            return ApiSuccess(musics);
        }

        [HttpDelete("ids")]
        public async Task<IActionResult> DeleteMultipleMusic([FromBody] List<Guid> ids)
        {
            // Convert strings to Guids, filter out invalid ones
            //var guidIds = new List<Guid>();
            //foreach (var id in ids)
            //{
            //    if (Guid.TryParse(id, out var parsedId))
            //    {
            //        guidIds.Add(parsedId);
            //    }
            //    else
            //    {
            //        return BadRequest($"Invalid Guid format: {id}");
            //    }
            //}
            var result = await _musicService.DeleteMultipleMusicAsync(ids);
            return ApiSuccess(result);
        }

        [HttpGet("total")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetTotalMusicResponse>))]
        public async Task<IActionResult> GetTotalMusicAsync([FromQuery] GetTotalMusicRequest input)
        {
            var result = await _musicService.GetTotalMusicAsync(input);
            return ApiSuccess(result);
        }
    }
}
