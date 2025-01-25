using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Book.Output
{
    public class GetBookResponse
    {
        public Guid BookId { get; set; }
        public string Title { get; set; }
        public string BookContent { get; set; }
        public string Publisher { get; set; }
        public string Author { get; set; }
        public DateTime YearPublic { get; set; }
        public string Image { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
    }
}
