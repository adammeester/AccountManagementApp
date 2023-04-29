using AutoMapper;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    public class AccountServiceTests
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly Mock<IAccountRepository> _accountRepo = new Mock<IAccountRepository>();
        private readonly Mock<IUserRepository> _userRepo = new Mock<IUserRepository>();
        public AccountServiceTests()
        {
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(new UserApiMappingProfiles()));
            _mapper = new Mapper(configuration);
            _accountService = new AccountService(_userRepo.Object, _accountRepo.Object, _mapper);
        }

        private User GetUserEntity()
        {
            return new User
            {
                Id = 123,
                Name = "test user",
                Email = "test@email.com",
                Salary = 125000,
                Expenses = 3400,
            };
        }

        [Fact]
        public async void CreateAccount__ValidTest()
        {
            var account = new AccountModel
            {
                UserId = 123
            };
            var user = GetUserEntity();

            _userRepo.Setup(x => x.FindUserAsync(It.IsAny<int>())).ReturnsAsync(user);
            _accountRepo.Setup(x => x.AddAccount(It.IsAny<Account>()));
            _accountRepo.Setup(x => x.SaveChangesAsync()).ReturnsAsync(1);

            var result = await _accountService.CreateAccount(account);

            Assert.NotNull(result);
            Assert.Equal(result.UserId, user.Id);
        }

        [Fact]
        public async void GetAccounts__ValidTest()
        {
            var accounts = new List<Account>()
            {
                new Account {
                    Id = 12,
                    UserId = 123,
                },
                new Account {
                    Id = 13,
                    UserId = 324,
                },
            };
            _accountRepo.Setup(x => x.GetAccountsAync()).ReturnsAsync(accounts);

            var results = await _accountService.GetAccounts();

            Assert.NotNull(results);
            Assert.Equal(2, results.Count());
        }

        [Theory]
        [InlineData(true, 55000, 54950)]
        [InlineData(false, 125000, 3400)]
        public async void CreateAccount__InvalidTest(bool userExists, decimal salary, decimal expsenses)
        {
            var account = new AccountModel
            {
                UserId = 123,
            };
            var user = GetUserEntity();
            user.Salary = salary;
            user.Expenses = expsenses;

            _userRepo.Setup(x => x.FindUserAsync(It.IsAny<int>())).ReturnsAsync(userExists ? user : null);
            _accountRepo.Setup(x => x.AddAccount(It.IsAny<Account>()));
            _accountRepo.Setup(x => x.SaveChangesAsync()).ReturnsAsync(1);

            await Assert.ThrowsAsync<AccountValidationException>(() => _accountService.CreateAccount(account));
        }
    }
}
