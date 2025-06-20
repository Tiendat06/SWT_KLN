using KLN;

var builder = WebApplication.CreateBuilder(args);
var httpApi = new KLNHttpApiHostModule();

httpApi.EnvConfiguration(builder);
// add cors
httpApi.CorsConfiguration(builder);

// add formdata config
httpApi.RequestConfiguraton(builder);

//// add localization
var localizationOptions = httpApi.LocalizationConfiguration(builder);

// Dependency Injection
// Add services to the container.
httpApi.DatabaseConfiguration(builder);
httpApi.ScopeConfiguration(builder);

//// add jwt in cookie
httpApi.AuthenticationConfiguration(builder);

httpApi.SwaggerConfiguration(builder);

httpApi.ControllerConfiguration(builder);

httpApi.OnBuildingConfiguration(builder, localizationOptions);
//