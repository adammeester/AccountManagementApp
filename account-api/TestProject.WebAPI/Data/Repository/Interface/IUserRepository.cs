using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.WebAPI.Data.Entities;

namespace TestProject.WebAPI.Data.Repository.Interface
{
    public interface IUserRepository
    {
        public Task<int> SaveChangesAsync();
        public bool UserExists(User user);
        public void DeleteUser(int id);
        public void AddUser(User user);
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<User> FindUserAsync(int id);
        public Task<User> FindUserByEmailAsync(string email);
        public void UpdateUser(int id, User user);
    }
}
