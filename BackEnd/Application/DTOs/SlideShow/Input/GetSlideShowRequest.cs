﻿using KLN.Shared.CrossCuttingConcerns;
namespace Application
{
    public class GetSlideShowRequest : PaginationWithSearchAndMediaTypeDto
    {
        public int SlideShowType { get; set; } = 0;
    }
}
