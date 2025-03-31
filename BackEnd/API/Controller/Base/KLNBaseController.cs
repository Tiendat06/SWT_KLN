using Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using KLN.Shared.CrossCuttingConcerns;

namespace API.Controller.Base
{
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<>))]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(DefaultResponse))]
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
            //if (code == HttpStatusCode.Created) result.StatusCode = (int)code;
            return result;
        }

        public static ObjectResult ApiSuccess<T>(T data, HttpStatusCode code = HttpStatusCode.OK, string message = "Success")
        {
            var result = new ObjectResult(new CustomResponse<T> { status = (int)code, data = data, message = message });
            //if (code == HttpStatusCode.Created) result.StatusCode = (int)code;
            return result;
        }
    }
}
