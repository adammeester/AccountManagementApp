using System.ComponentModel.DataAnnotations;

namespace TestProject.WebAPI.Models
{
    public class AccountModel
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
