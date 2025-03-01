
//using Domain.Entities;

//namespace Application.Mapper.TopicMedias.Output
//{
//    public class GetTopicMediaResponseMapper
//    {
//        public static GetTopicMediaResponse GetTopicMediaMapEntityToDTO(TopicMedia topicMedia)
//        {
//            return new GetTopicMediaResponse
//            {
//                TopicMediaId = topicMedia.TopicMediaId,
//                TopicId = topicMedia.TopicId,
//                ImageLink = topicMedia.ImageLink,
//                VideoLink = topicMedia.VideoLink,
//                Title = topicMedia.Title
//            };
//        }
//        public static IEnumerable<GetTopicMediaResponse> GetTopicMediaListMapEntityToDTO(IEnumerable<TopicMedia> topicMedias)
//        {
//            List<GetTopicMediaResponse> topicMediaListDTO = new();
//            foreach (var topicMedia in topicMedias)
//            {
//                topicMediaListDTO.Add(new GetTopicMediaResponse
//                {
//                    TopicMediaId = topicMedia.TopicMediaId,
//                    TopicId = topicMedia.TopicId,
//                    ImageLink = topicMedia.ImageLink,
//                    VideoLink = topicMedia.VideoLink,
//                    Title = topicMedia.Title
//                });
//            }
//            return topicMediaListDTO;
//        }
//    }
//}
