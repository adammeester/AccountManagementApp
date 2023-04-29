using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.WebAPI.Models;

namespace TestProject.WebAPI.Services.Interface
{
    public interface IUserService
    {
        public Task<IEnumerable<UserModel>> GetAllUsers();
        public Task<UserModel> GetUserById(int id);
        public Task<UserModel> GetUserByEmail(string email);
        public Task<UserModel> UpdateUser(int id, UserModel user);
        public Task<int> DeleteUser(int id);
        public Task<UserModel> CreateUser(UserModel user);
    }
}
