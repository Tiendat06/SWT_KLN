namespace Application.Extension
{
    public class CommonExtensions
    {
        public static string GetValidateMessage(string key, params object[] args)
        {
            return string.Format(key, args);
        }
    }
}
