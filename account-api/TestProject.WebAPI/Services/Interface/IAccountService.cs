using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.WebAPI.Models;

namespace TestProject.WebAPI.Services.Interface
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountModel>> GetAccounts();
        Task<AccountModel> GetAccount(int id);
        Task<int> UpdateAccount(int id, AccountModel account);
        Task<AccountModel> CreateAccount(AccountModel account);
        Task<int> DeleteAccount(int id);
    }
}
