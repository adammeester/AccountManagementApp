using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.WebAPI.Data.Entities;

namespace TestProject.WebAPI.Data.Repository.Interface
{
    public interface IAccountRepository
    {
        public Task<int> SaveChangesAsync();
        bool AccountExists(Account account);
        public void DeleteAccount(int id);
        public void AddAccount(Account Account);
        public Task<IEnumerable<Account>> GetAccountsAync();
        public Task<Account> FindAccountAsync(int id);
        public Task<Account> UpdateAccount(int id, Account Account);
    }
}
