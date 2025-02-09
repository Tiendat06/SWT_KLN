using Microsoft.Extensions.Localization;
using System.Text.Json;

namespace Domain.Localization
{
    public class KLNResourcesLocalizer : IStringLocalizer
    {
        private readonly Dictionary<string, string> _localizationData;

        public KLNResourcesLocalizer(string filePath)
        {
            if(File.Exists(filePath))
            {
                var json = File.ReadAllText(filePath);
                _localizationData = JsonSerializer.Deserialize<Dictionary<string, string>>(json) ?? new();
            }
            else
            {
                _localizationData = new Dictionary<string, string>();
            }
        }

        public LocalizedString this[string name]
        {
            get
            {
                var value = _localizationData.ContainsKey(name) ? _localizationData[name] : name;
                return new LocalizedString(name, value, !_localizationData.ContainsKey(name));
            }
        }

        public LocalizedString this[string name, params object[] arguments] => this[name];

        public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
        {
            return _localizationData.Select(kv => new LocalizedString(kv.Key, kv.Value, false));
        }
    }
}
