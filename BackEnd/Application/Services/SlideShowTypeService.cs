using Application.Interfaces;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class SlideShowTypeService(
        ISlideShowTypeRepository _slideShowTypeRepository
        ) : ISlideShowTypeService
    {
        public async Task<PaginationResponseDto<GetSlideShowTypeOutputDto>> GetSlideShowTypeListAsync(GetSlideShowInputDto input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var slideShowTypes = await _slideShowTypeRepository.GetSlideShowTypeListAsync(page, fetch);
            var totalSlideShowType = await _slideShowTypeRepository.CountSlideShowTypeAsync();
            var slideShowTypesMapper = GetSlideShowTypeReponseMapper.GetSlideShowListMapEntityToDTO(slideShowTypes);
            return new PaginationResponseDto<GetSlideShowTypeOutputDto>(totalSlideShowType, slideShowTypesMapper);
        }
    }
}
