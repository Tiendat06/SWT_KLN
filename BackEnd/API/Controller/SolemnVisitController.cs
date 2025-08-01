using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using Application;
using KLN.Shared.CrossCuttingConcerns;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolemnVisitController(
        ISolemnVisitService _solemnVisitService,
        ISolemnVisitValidator _solemnVisitValidator
        ) : KLNBaseController
    {
        // GET: api/SolemnVisit
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<PaginationResponseDto<GetSolemnVisitResponse>>))]
        public async Task<IActionResult> GetAllSolemnVisits([FromQuery] GetSolemnVisitRequest input)
        {
            var solemnVisits = await _solemnVisitService.GetAllSolemnVisitsAsync(input);

            return ApiSuccess(solemnVisits);
        }
        // GET: api/SolemnVisit/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSolemnVisitResponse>))]
        public async Task<IActionResult> GetSolemnVisitById(Guid id)
        {
            var solemnVisit = await _solemnVisitService.GetSolemnVisitByIdAsync(id);

            return ApiSuccess(solemnVisit);
        }

        // POST: api/SolemnVisit
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetSolemnVisitResponse>))]
        public async Task<IActionResult> CreateSolemnVisit([FromForm] AddSolemnVisitRequest addSolemnVisitRequest)
        {
            var solemnVisit = await _solemnVisitValidator.CreateSolemnVisitAsyncValidator(addSolemnVisitRequest);

            return ApiSuccess(solemnVisit);
        }

        // PUT: api/SolemnVisit/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSolemnVisitResponse>))]
        public async Task<IActionResult> UpdateSolemnVisit(Guid id, [FromForm] UpdateSolemnVisitRequest request)
        {
            var updatedSolemnVisit = await _solemnVisitValidator.UpdateSolemnVisitAsyncValidator(id, request);
            return ApiSuccess(updatedSolemnVisit);
        }
    }
}
