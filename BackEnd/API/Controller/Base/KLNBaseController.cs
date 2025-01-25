using Application.DTOs.Site.Output;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace API.Controller.Base
{
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(DefaultResponse))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(DefaultResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(DefaultResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(DefaultResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(DefaultResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(DefaultResponse))]
    public class KLNBaseController : ControllerBase
    {
        public KLNBaseController() { }

        public static ObjectResult ApiSuccess(HttpStatusCode code = HttpStatusCode.OK, string message = "Success")
        {
            var result = new ObjectResult(new DefaultResponse { status = (int)code, message = message });
            if (code == HttpStatusCode.Created) result.StatusCode = (int)code;
            return result;
        }

        public static ObjectResult ApiSuccess<T>(T data, HttpStatusCode code = HttpStatusCode.OK, string message = "Success")
        {
            var result = new ObjectResult(new CustomResponse<T> { status = (int)code, data = data, message = message });
            if (code == HttpStatusCode.Created) result.StatusCode = (int)code;
            return result;
        }
    }
}
