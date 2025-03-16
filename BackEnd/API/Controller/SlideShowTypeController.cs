using API.Controller.Base;
using Application;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideShowTypeController(
        ISlideShowTypeService _slideShowTypeService
        ) : KLNBaseController
    {
        // GET: api/SlideShowType
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<PaginationResponseDto<GetSlideShowTypeOutputDto>>))]
        public async Task<IActionResult> GetAllSlideShows([FromQuery] GetSlideShowInputDto input)
        {
            var slideShows = await _slideShowTypeService.GetSlideShowTypeListAsync(input);
            return ApiSuccess(slideShows);
        }
    }
}
