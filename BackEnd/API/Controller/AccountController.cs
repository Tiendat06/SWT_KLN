using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controller.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : KLNBaseController
    {

        public AccountController()
        {
        }
    }
}
