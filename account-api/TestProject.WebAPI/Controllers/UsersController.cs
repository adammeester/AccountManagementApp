using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestProject.WebAPI.Exceptions;
using TestProject.WebAPI.Models;
using TestProject.WebAPI.Services.Interface;

namespace TestProject.WebAPI.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService service, ILogger<UsersController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            try
            {
                var users = await _service.GetAllUsers();

                if (!users.Any())
                {
                    return NotFound();
                }
                return Ok(users);
            }
            catch (Exception e)
            {
                _logger.LogError("Get all users failed", e);
                return StatusCode(500);
            }
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUser(int id)
        {
            try
            {
                var user = await _service.GetUserById(id);

                if (user == null)
                {
                    return BadRequest();
                }

                return Ok(user);
            }
            catch (Exception e)
            {
                _logger.LogError("Get user failed", e);
                return StatusCode(500);
            }
        }

        // GET: api/Users/GetUserByEmail/email
        [HttpGet("GetUserByEmail/{email}")]
        public async Task<ActionResult<UserModel>> GetUserByEmail(string email)
        {
            try
            {
                var user = await _service.GetUserByEmail(email);

                if (user == null)
                {
                    return BadRequest();
                }

                return Ok(user);
            }
            catch (Exception e)
            {
                _logger.LogError("Get user failed", e);
                return StatusCode(500);
            }
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromBody] UserModel user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            try
            {
                var result = await _service.UpdateUser(id, user);
                return Ok(result);
            }
            catch (DbUpdateConcurrencyException e)
            {
                _logger.LogError("Update user failed", e);
                return StatusCode(500);
            }
        }

        // POST: api/Users
        [HttpPost]
        [Route("CreateUser")]
        public async Task<ActionResult<UserModel>> PostUser([FromBody] UserModel user)
        {
            try
            {
                var newUser = await _service.CreateUser(user);

                return CreatedAtAction(nameof(PostUser), newUser);
            }
            catch(UserValidationException e)
            {
                return BadRequest($"Could not create user - {e.ErrorMessage}");
            }
            catch (Exception e)
            {
                _logger.LogError("Create user failed", e);
                return StatusCode(500);
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _service.DeleteUser(id);
            return result > 0 ? Ok("Record deleted.") : BadRequest();
        }
    }
}
