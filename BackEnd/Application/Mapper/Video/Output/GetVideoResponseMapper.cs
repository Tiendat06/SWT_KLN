using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Video.Output;
using Domain.Entities;

namespace Application.Mapper.Videos.Output
{
    public class GetVideoResponseMapper
    {
        public static GetVideoResponse GetVideoMapEntityToDTO(Video video)
        {
            return new GetVideoResponse
            {
                VideoId = video.VideoId,
                VideoTitle = video.Title,
                VideoCreateDate = video.CreateDate,
                VideoImageLink = video.ImageLink,
                VideoLink = video.VideoLink,
                UserId = video.UserId,
                Name = video.User.Name,
                Email = video.User.Email,
                UserName = video.User.Account.UserName,
                RoleName = video.User.Account.Role.RoleName
            };
        }
        public static IEnumerable<GetVideoResponse> GetVideoListMapEntityToDTO(IEnumerable<Video> videos)
        {
            List<GetVideoResponse> videoListDTO = new();
            foreach (var video in videos)
            {
                videoListDTO.Add(new GetVideoResponse
                {
                    VideoId = video.VideoId,
                    VideoTitle = video.Title,
                    VideoCreateDate = video.CreateDate,
                    VideoImageLink = video.ImageLink,
                    VideoLink = video.VideoLink,
                    UserId = video.UserId,
                    Name = video.User.Name,
                    Email = video.User.Email,
                    UserName = video.User.Account.UserName,
                    RoleName = video.User.Account.Role.RoleName
                });
            }
            return videoListDTO;
        }
    }
}
