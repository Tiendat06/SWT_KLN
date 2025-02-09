using Microsoft.Extensions.Localization;
using System.Globalization;

namespace Domain.Localization
{
    public class KLNResourcesLocalizerFactory : IStringLocalizerFactory
    {
        private readonly string _resourcePath;
        private const string DefaultCulture = "vi";
        public KLNResourcesLocalizerFactory(string resourcePath)
        {
            _resourcePath = resourcePath;
        }

        public IStringLocalizer Create(Type resourceSource)
        {
            return Create();
        }

        public IStringLocalizer Create(string baseName, string location)
        {
            return Create();
        }

        private IStringLocalizer Create()
        {
            var culture = CultureInfo.CurrentUICulture.Name;
            var filePath = Path.Combine(_resourcePath, $"{culture}.json");

            if (!File.Exists(filePath))
            {
                filePath = Path.Combine(_resourcePath, $"{DefaultCulture}.json");
            }

            return new KLNResourcesLocalizer(filePath);
        }
    }
}
