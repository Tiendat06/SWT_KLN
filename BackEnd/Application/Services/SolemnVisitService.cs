using Application.DTOs.SolemnVisit.Output;
using Application.Interfaces;
using Application.Mapper.SolemnVisits.Output;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using System.Reflection.Metadata;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Application.Utils;
using System.Text.Json;
using Application.Extension;

namespace Application.Services
{
    public class SolemnVisitService : ISolemnVisitService
    {
        #region Fields
        private readonly Domain.Interfaces.ISolemnVisitRepository _solemnVisitRepository;
        //private readonly ILogSolemnVisitRepository _logSolemnVisitRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        #endregion

        #region Constructor
        public SolemnVisitService(
            Domain.Interfaces.ISolemnVisitRepository solemnVisitRepository,
            IUnitOfWork unitOfWork,
            //ILogSolemnVisitRepository logSolemnVisitRepository,
            Cloudinary cloudinary,
            IConfiguration configuration
        )
        {
            _solemnVisitRepository = solemnVisitRepository;
            _unitOfWork = unitOfWork;
            //_logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
        }
        #endregion
        public async Task<IEnumerable<GetSolemnVisitResponse>> GetAllSolemnVisitsAsync()
        {
            var solemnVisits = await _solemnVisitRepository.GetAllSolemnVisitsAsync();

            return GetSolemnVisitResponseMapper.GetSolemnVisitListMapEntityToDTO(solemnVisits);
        }
        public async Task<GetSolemnVisitResponse?> GetSolemnVisitByIdAsync(Guid id)
        {
            var solemnVisit = await _solemnVisitRepository.GetSolemnVisitByIdAsync(id) ?? throw new KeyNotFoundException("SolemnVisit khong ton tai !");

            return GetSolemnVisitResponseMapper.GetSolemnVisitMapEntityToDTO(solemnVisit);

        }
    }
}
