using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using System.Net;
using Application;
using KLN.Shared.CrossCuttingConcerns;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MagazineController(
        IMagazineService _magazineService,
        ILogMagazineService _logMagazineService,
        IMagazineValidator _magazineValidator
        ) : KLNBaseController
    {
        // GET: api/Magazine
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<PaginationResponseDto<GetMagazineResponse>>))]
        public async Task<IActionResult> GetAllMagazines([FromQuery] GetAllMagazineRequest input)
        {
            var magazines = await _magazineService.GetAllMagazinesAsync(input);
            return ApiSuccess(magazines);
        }

        // GET: api/Magazine/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetMagazineResponse>))]
        public async Task<IActionResult> GetMagazineById(Guid id)
        {
            var magazine = await _magazineService.GetMagazineByIdAsync(id);

            return ApiSuccess(magazine);
        }

        // POST: api/Magazine
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetMagazineResponse>))]
        public async Task<IActionResult> CreateMagazine([FromForm] AddMagazineRequest addMagazineRequest)
        {
            var magazines = await _magazineValidator.CreateMagazineAsyncValidator(addMagazineRequest);
            return ApiSuccess(magazines, HttpStatusCode.Created);
        }

        // PUT: api/Magazine/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetMagazineResponse>))]
        public async Task<IActionResult> PutMagazine(Guid id, [FromForm] UpdateMagazineRequest updateMagazineRequest)
        {
            var updatedMagazine = await _magazineValidator.UpdateMagazineAsyncValidator(id, updateMagazineRequest);

            return ApiSuccess(updatedMagazine);
        }

        // DELETE: api/Magazine/ids
        [HttpDelete("ids")]
        public async Task<IActionResult> DeleteMagazine([FromForm] List<Guid> ids)
        {
            var result = await _magazineService.DeleteMultipleMagazinesAsync(ids);

            return ApiSuccess(result);
        }
    }
}
