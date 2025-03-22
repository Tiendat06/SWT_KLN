using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Newtonsoft.Json.Linq;

namespace KLN.Shared.CrossCuttingConcerns.Utils
{
    public class CloudinaryOperations
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryOperations(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }
        public JObject UploadFileFromLocalToCloudinary(string filePath, string assetFolder, string publicId)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(filePath),
                PublicId = publicId,
                AssetFolder = assetFolder
            };
            var result = _cloudinary.Upload(uploadParams) ?? throw new InvalidOperationException("Upload file to Cloudinary failed !");
            return (JObject)result.JsonObj;
        }

        public JObject DeleteFileFromCloudinary(string publicId)
        {
            var deleteParams = new DelResParams()
            {
                PublicIds = new List<string> { publicId },
            };
            var result = _cloudinary.DeleteResources(deleteParams) ?? throw new InvalidOperationException("Delete file from Cloudinary failed !");
            return (JObject)result.JsonObj;
        }
    }
}
