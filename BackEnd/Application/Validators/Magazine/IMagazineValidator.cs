using Application.DTOs.Magazine.Input;
using Application.DTOs.Magazine.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public interface IMagazineValidator
    {
        Task<GetMagazineResponse> CreateMagazineAsyncValidator(AddMagazineRequest addMagazineRequest);
        Task<GetMagazineResponse> UpdateMagazineAsyncValidator(Guid id, UpdateMagazineRequest updateMagazineRequest);
    }
}
