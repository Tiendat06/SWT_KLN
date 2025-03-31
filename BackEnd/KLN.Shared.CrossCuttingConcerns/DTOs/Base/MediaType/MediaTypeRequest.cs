namespace KLN.Shared.CrossCuttingConcerns
{
    public class MediaTypeRequest : IMediaTypeRequest
    {
        public virtual int Type { get; set; } = 0;
    }
}
