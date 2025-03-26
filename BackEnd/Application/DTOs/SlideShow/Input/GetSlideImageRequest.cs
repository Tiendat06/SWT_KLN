using Microsoft.AspNetCore.Http;

namespace Application
{
    public class GetSlideImageRequest
    {
        public string Capture { get; set; }
        public IFormFile SlideImage { get; set; }
    }
}
