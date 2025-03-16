using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class GetSlideShowTypeReponseMapper
    {
        public static GetSlideShowTypeOutputDto GetSlideShowMapEntityToDTO(SlideShowType slideShowType)
        {
            return new GetSlideShowTypeOutputDto
            {
                SlideShowTypeId = slideShowType.SlideShowTypeId,
                SlideShowTypeName = slideShowType.TypeName,
                SlideShowDescription = slideShowType.TypeDescription,
            };
        }
        public static IEnumerable<GetSlideShowTypeOutputDto> GetSlideShowListMapEntityToDTO(IEnumerable<SlideShowType> slideShowTypes)
        {
            List<GetSlideShowTypeOutputDto> slideShowTypeListDTO = new();
            foreach (var slideShowType in slideShowTypes)
            {
                slideShowTypeListDTO.Add(new GetSlideShowTypeOutputDto
                {
                    SlideShowTypeId = slideShowType.SlideShowTypeId,
                    SlideShowTypeName = slideShowType.TypeName,
                    SlideShowDescription = slideShowType.TypeDescription,
                });
            }
            return slideShowTypeListDTO;
        }
    }
}
