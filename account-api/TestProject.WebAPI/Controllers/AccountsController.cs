using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestProject.WebAPI.Exceptions;
using TestProject.WebAPI.Models;
using TestProject.WebAPI.Services.Interface;

namespace TestProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _service;
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(IAccountService service, ILogger<AccountsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountModel>>> GetAccounts()
        {
            try
            {
                var accounts = await _service.GetAccounts();

                if (!accounts.Any())
                {
                    return NotFound();
                }
                return Ok(accounts);
            }
            catch (Exception e)
            {
                _logger.LogError("Get all accounts failed", e);
                return StatusCode(500);
            }
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountModel>> GetAccount(int id)
        {
            var account = await _service.GetAccount(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(int id, AccountModel account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }


            try
            {
                var result = await _service.UpdateAccount(id, account);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError("Failed to update account", e);
                return StatusCode(500);
            }
        }

        // POST: api/CreateAccount
        [HttpPost]
        [Route("CreateAccount")]
        public async Task<ActionResult<AccountModel>> PostAccount(AccountModel account)
        {
            try
            {
                var newAccount = await _service.CreateAccount(account);
                return CreatedAtAction(nameof(PostAccount), newAccount);
            }
            catch(AccountValidationException e)
            {
                return BadRequest($"Could not create account - {e.ErrorMessage}");
            }
            catch (Exception e)
            {
                _logger.LogError("Failed to create account", e);
                return StatusCode(500);
            }
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {

            var result = await _service.DeleteAccount(id);

            return NoContent();
        }
    }
}
