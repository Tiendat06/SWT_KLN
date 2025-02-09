namespace Application.DTOs.Site.Resources
{
    public class SiteValidatorResources
    {
        public static string MaxLength = "{0} có ký tự tối đa là {1}";
        public static string LengthBetween = "{0} phải nằm trong khoảng {1} - {2}";

        public static string GetValidateMessage(string key, params object[] args)
        {
            return string.Format(key, args);
        }
    }
}
