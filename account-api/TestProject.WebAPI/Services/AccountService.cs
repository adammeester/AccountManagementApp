using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.WebAPI.Data.Entities;
using TestProject.WebAPI.Data.Repository.Interface;
using TestProject.WebAPI.Exceptions;
using TestProject.WebAPI.Models;
using TestProject.WebAPI.Services.Interface;

namespace TestProject.WebAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepo;
        private readonly IAccountRepository _accountRepo;
        private readonly IMapper _mapper;
        public AccountService(IUserRepository userRepo, IAccountRepository accountRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _accountRepo = accountRepo;
            _mapper = mapper;
        }
        public async Task<IEnumerable<AccountModel>> GetAccounts()
        {
            return _mapper.Map<List<AccountModel>>(await _accountRepo.GetAccountsAync());
        }

        public async Task<AccountModel> CreateAccount(AccountModel account)
        {
            var mappedAccount = _mapper.Map<Account>(account);

            var user = await _userRepo.FindUserAsync(mappedAccount.UserId);

            if (user == null)
            {
                throw new AccountValidationException("User does not exist.");
            }
            if (_accountRepo.AccountExists(mappedAccount))
            {
                throw new AccountValidationException("Account already exists for user.");
            }
            if ((user.Salary - user.Expenses) < 1000)
            {
                throw new AccountValidationException("Expenses too high for current salary.");
            }


            _accountRepo.AddAccount(mappedAccount);
            await _accountRepo.SaveChangesAsync();

            var result =  _mapper.Map<AccountModel>(mappedAccount);
            return result;
        }

        public Task<int> DeleteAccount(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<AccountModel> GetAccount(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> UpdateAccount(int id, AccountModel account)
        {
            throw new System.NotImplementedException();
        }
    }
}
