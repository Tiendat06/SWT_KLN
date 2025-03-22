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
    public class SolemnVisitController : KLNBaseController
    {
        private readonly ISolemnVisitService _solemnVisitService;
        //private readonly ILogSolemnVisitService logSolemnVisitService;
        private readonly ISolemnVisitValidator _solemnVisitValidator;
        public SolemnVisitController(ISolemnVisitService solemnVisitService, ISolemnVisitValidator solemnVisitValidator)
        {
            _solemnVisitService = solemnVisitService;
            _solemnVisitValidator = solemnVisitValidator;
        }
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
    }
}
