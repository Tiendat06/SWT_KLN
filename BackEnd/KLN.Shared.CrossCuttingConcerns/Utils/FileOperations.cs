using Microsoft.AspNetCore.Http;

namespace KLN.Shared.CrossCuttingConcerns.Utils
{
    public class FileOperations
    {
        public static async Task<string> SaveFileToLocal(string folderPath, IFormFile file)
        {
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var filePath = Path.Combine(folderPath, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return filePath;
        }

        public static bool DeleteFileFromLocal(string filePath, string folderPath)
        {
            if (File.Exists(filePath) && Directory.Exists(folderPath))
            {
                File.Delete(filePath);
                if (Directory.GetFileSystemEntries(folderPath).Length == 0)
                {
                    Directory.Delete(folderPath);
                }
                return true;
            }
            return false;
        }

        public static bool CheckFileType(string[] allowedContentTypes, IFormFile file)
        {
            return Array.Exists(allowedContentTypes, type => type == file.ContentType);
        }
    }
}
