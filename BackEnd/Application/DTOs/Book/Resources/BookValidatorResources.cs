using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Book.Resources
{
    public class BookValidatorResources
    {
        public static string BookTitle = "Tiêu đề sách";
        public static string Publisher = "Nhà xuất bản";
        public static string Author = "Tác giả";

        public static string TitleNotEmpty = "Tiêu đề không được để trống !";
        public static string BookContentNotEmpty = "Nội dung không được để trống !";
        public static string PublisherNotEmpty = "Nhà xuất bản không được để trống !";
        public static string AuthorNotEmpty = "Tác giả không được để trống !";
        public static string YearPublicNotEmpty = "Năm xuất bản không được để trống !";
        public static string ImageNotEmpty = "Hình ảnh không được để trống !";
        public static string UserIdNotEmpty = "Người dùng không hợp lệ !";
    }
}
