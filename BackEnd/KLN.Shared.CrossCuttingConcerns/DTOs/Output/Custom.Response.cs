namespace KLN.Shared.CrossCuttingConcerns
{
    public class CustomResponse<T>
    {
        public int? status { get; set; }
        public T? data { get; set; }
        public string? message { get; set; }
    }
}
