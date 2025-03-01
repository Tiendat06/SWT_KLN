using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using System.Net;
using Application;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MagazineController : KLNBaseController
    {
        private readonly IMagazineService _magazineService;
        private readonly ILogMagazineService _logMagazineService;
        private readonly IMagazineValidator _magazineValidator;

        public MagazineController(IMagazineService magazineService, ILogMagazineService logMagazineService, IMagazineValidator magazineValidator)
        {
            _magazineService = magazineService;
            _logMagazineService = logMagazineService;
            _magazineValidator = magazineValidator;
        }

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

        // DELETE: api/Magazine/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMagazine(Guid id)
        {
            var isDeleted = await _magazineService.DeleteMagazineAsync(id);

            return ApiSuccess(isDeleted);
        }
    }
}
