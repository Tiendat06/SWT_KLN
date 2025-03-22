using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace KLN.Shared.CrossCuttingConcerns.Exceptions
{
    public class ExceptionApiResult: ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            if (exception != null) 
            {
                var statusCode = 0;
                var message = "";
                switch (exception)
                {
                    // 400 - Bad Request
                    case ArgumentNullException:
                    case ArgumentException:
                    case FormatException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        message = "Invalid input provided !";
                        break;
                    // 401 - Unauthorized
                    case UnauthorizedAccessException:
                        statusCode = (int)HttpStatusCode.Unauthorized;
                        message = "Unauthorized access !";
                        break;
                        
                    // 403 - Forbidden
                    case AccessViolationException:
                        statusCode = (int)HttpStatusCode.Forbidden;
                        message = "Access is forbidden !";
                        break;

                    // 404 - Not Found
                    case KeyNotFoundException:
                        statusCode = (int)HttpStatusCode.NotFound;
                        message = "Resource not found !";
                        break;

                    // 409 - Conflict
                    case InvalidOperationException:
                        statusCode = (int)HttpStatusCode.Conflict;
                        message = "Conflict occurred !";
                        break;

                    // 500 - Internal Server Error                        
                    default:
                        statusCode = (int)HttpStatusCode.InternalServerError;
                        message = "Server Error !";
                        break;
                }
                context.HttpContext.Response.StatusCode = statusCode;
                context.Result = new ObjectResult(new DefaultResponse
                {
                    status = statusCode,
                    message = exception.Message
                });
                context.ExceptionHandled = true;
            }
        }
    }
}
