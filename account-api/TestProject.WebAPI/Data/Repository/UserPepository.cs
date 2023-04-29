using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestProject.WebAPI.Data.Entities;
using TestProject.WebAPI.Data.Repository.Interface;

namespace TestProject.WebAPI.Repository
{
    public class UserPepository : IUserRepository
    {
        private readonly DbContext _dbContext;
        public UserPepository(DbContext dbContext)
        {
            _dbContext = dbContext; 
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public bool UserExists(User user)
        {
            return _dbContext.Users.Any(existingUser => existingUser.Id == user.Id ||
                existingUser.Email == user.Email);
        }
        void IUserRepository.AddUser(User user)
        {
            _dbContext.Add(user);
        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _dbContext.Users
                .Include(u => u.Account)
                .ToListAsync();
        }
        public async Task<User> FindUserAsync(int id)
        {
           return await _dbContext.Users.FindAsync(id);
        }
        public async Task<User> FindUserByEmailAsync(string email)
        {
            return await _dbContext.Users
                .Include(u => u.Account)
                .FirstOrDefaultAsync(user => user.Email == email);
        }
        public void UpdateUser(int id, User user)
        {
            _dbContext.Entry(user).State = EntityState.Modified;
        }
        public void DeleteUser(int id)
        {
            _dbContext.Remove(id);
        }
    }
}
