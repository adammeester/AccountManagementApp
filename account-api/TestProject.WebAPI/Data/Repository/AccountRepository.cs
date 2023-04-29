using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestProject.WebAPI.Data.Entities;
using TestProject.WebAPI.Data.Repository.Interface;

namespace TestProject.WebAPI.Data.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DbContext _dbContext;
        public AccountRepository(DbContext dbContext)
        {
            _dbContext = dbContext; 
        }
        public bool AccountExists(Account account)
        {
            return _dbContext.Accounts.Any(existingAccount => existingAccount.Id == account.Id 
                || existingAccount.UserId == account.UserId);
        }
        public void AddAccount(Account Account)
        {
           _dbContext.Add(Account);
        }

        public void DeleteAccount(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Account> FindAccountAsync(int id)
        {
            return await _dbContext.Accounts.FindAsync(id);
        }

        public async Task<IEnumerable<Account>> GetAccountsAync()
        {
            return await _dbContext.Accounts.ToListAsync();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public Task<Account> UpdateAccount(int id, Account Account)
        {
            throw new System.NotImplementedException();
        }
    }
}
