using AutoMapper;
using Moq;
using System;
using System.Threading.Tasks;
using TestProject.WebAPI.Data.Entities;
using TestProject.WebAPI.Data.MappingProfiles;
using TestProject.WebAPI.Data.Repository.Interface;
using TestProject.WebAPI.Exceptions;
using TestProject.WebAPI.Models;
using TestProject.WebAPI.Services;
using TestProject.WebAPI.Services.Interface;
using Xunit;

namespace TestProject.Tests
{
    public class UserServiceTests
    {
        private readonly IUserService _service;
        private readonly IMapper _mapper;
        private readonly Mock<IUserRepository> _userRepo = new Mock<IUserRepository>();
        public UserServiceTests()
        {
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(new UserApiMappingProfiles()));
            _mapper = new Mapper(configuration);
            _service = new UserService(_userRepo.Object, _mapper);
        }

        private UserModel GetUserModel()
        {
            return new UserModel
            {
                Name = "testUser",
                Email = "test@email.com",
                Salary = 125000,
                Expenses = 3400,
            };
        }

        private User GetUserEntity()
        {
            return new User
            {
                Id = 123,
                Name = "testUser",
                Email = "test@email.com",
                Salary = 125000,
                Expenses = 3400,
            };
        }

        [Fact]
        public async void GetUserByEmail__ValidTest()
        {
            var email = "test@email.com";
            var user = GetUserModel();
            var userEntity = GetUserEntity();

            _userRepo.Setup(x => x.FindUserByEmailAsync(It.IsAny<string>())).ReturnsAsync(userEntity);

            var result = await _service.GetUserByEmail(email);

            Assert.NotNull(result);
            Assert.Equal(result.Name, user.Name);
        }

        [Fact]
        public async void CreateUser__ValidTest()
        {
            var user = GetUserModel();

            _userRepo.Setup(x => x.AddUser(It.IsAny<User>()));
            _userRepo.Setup(x => x.SaveChangesAsync()).ReturnsAsync(1);

            var result = await _service.CreateUser(user);

            Assert.NotNull(result);
            Assert.Equal(result.Name, user.Name);

        }
        [Fact]
        public async void CreateUser__InvalidTest()
        {
            var user = GetUserModel();

            _userRepo.Setup(x => x.UserExists(It.IsAny<User>())).Returns(true);
            _userRepo.Setup(x => x.AddUser(It.IsAny<User>()));
            _userRepo.Setup(x => x.SaveChangesAsync()).ReturnsAsync(1);

            await Assert.ThrowsAsync<UserValidationException>(() => _service.CreateUser(user));
        }
    }
}