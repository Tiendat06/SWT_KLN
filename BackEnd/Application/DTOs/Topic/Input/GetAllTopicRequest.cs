﻿using KLN.Shared.CrossCuttingConcerns;
namespace Application
{
    public class GetAllTopicRequest : PaginationWithSearchAndMediaTypeDto
    {
        public int TopicType { get; set; } = 0;
    }
}