using Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.SolemnVisit.Output
{
    public class GetSolemnVisitResponse
    {
        public required Guid SolemnVisitId { get; set; }
        public string? SolemnVisitName { get; set; }
        public string? PortraitImage { get; set; }
        public string? LetterImage { get; set; }
        public DateTime? CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }
    }
}
