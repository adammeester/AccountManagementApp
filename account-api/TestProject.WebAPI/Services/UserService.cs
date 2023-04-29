using AutoMapper;
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
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public UserService(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;   
            _mapper = mapper;
        }
        public async Task<UserModel> CreateUser(UserModel user)
        {
            var mappedUser = _mapper.Map<User>(user);
            if (_repo.UserExists(mappedUser))
            {
                throw new UserValidationException("User already exists");
            }

            _repo.AddUser(mappedUser);
            await _repo.SaveChangesAsync();

            return _mapper.Map<UserModel>(mappedUser);
        }

        public async Task<int> DeleteUser(int id)
        {
            var user = _repo.FindUserAsync(id);
            if (user == null)
            {
                throw new Exception("Could not delete user");
            }
            _repo.DeleteUser(id);
            return await _repo.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            return _mapper.Map<List<UserModel>>(await _repo.GetAllUsers());
        }

        public async Task<UserModel> GetUserByEmail(string email)
        {
            return _mapper.Map<UserModel>(await _repo.FindUserByEmailAsync(email));
        }

        public async Task<UserModel> GetUserById(int id)
        {
            return _mapper.Map<UserModel>(await _repo.FindUserAsync(id));
        }

        public Task<UserModel> UpdateUser(int id, UserModel user)
        {
            throw new System.NotImplementedException();
        }
    }
}
