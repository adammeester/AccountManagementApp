

using System.ComponentModel.DataAnnotations;

namespace TestProject.WebAPI.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public decimal Salary { get; set; }
        [Required]
        public decimal Expenses { get; set; }
        public AccountModel Account { get; set; }
    }
}
