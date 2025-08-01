﻿using Microsoft.AspNetCore.Http;

namespace Application {
    public class GetTopicMediaRequest
    {
        public string Capture { get; set; }
        public IFormFile MediaLink { get; set; }
    }
    public class GetTopicImageRequest
    {
        public int Id { get; set; }
        public string Capture { get; set; }
        public IFormFile ImageLink { get; set; }
    }
    public class GetTopicVideoRequest
    {
        public int Id { get; set; }
        public string Capture { get; set; }
        public IFormFile VideoLink { get; set; }
    }
}
