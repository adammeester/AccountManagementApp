using AutoMapper;
using TestProject.WebAPI.Data.Entities;
using TestProject.WebAPI.Models;

namespace TestProject.WebAPI.Data.MappingProfiles
{
    public class UserApiMappingProfiles : Profile
    {
        public UserApiMappingProfiles()
        {
            CreateMap<UserModel, User>()
                .ReverseMap();
            CreateMap<AccountModel, Account>()
                .ReverseMap();
        }
    }
}
