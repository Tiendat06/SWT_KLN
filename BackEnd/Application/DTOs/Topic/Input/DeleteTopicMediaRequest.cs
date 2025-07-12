using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class DeleteTopicMediaRequest
    {
        public Guid TopicId { get; set; }
        public int MediaTypeId { get; set; }
        public Guid UserId { get; set; }
        public List<int> ImageIds { get; set; }
        public List<int> VideoIds { get; set; }
    }
}
