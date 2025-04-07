namespace KLN.Shared.CrossCuttingConcerns
{
    public class CustomResponse<T>
    {
        public int? Status { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
    }
}
