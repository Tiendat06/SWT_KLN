using Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Video.Output
{
    public class GetVideoResponse
    {
        public required Guid? VideoId { get; set; }
        public string? VideoTitle { get; set; }
        public DateTime? VideoCreateDate { get; set; }
        public string? VideoImageLink { get; set; }
        public string? VideoLink { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }
    }
}
