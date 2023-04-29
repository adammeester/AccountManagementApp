using System.Linq;
using TestProject.WebAPI.Data.Entities;

namespace TestProject.WebAPI.SeedData
{
    public static class UserApiSeeder
    {
        public static void Seed(this DbContext dbContext)
        {
            if (dbContext.Users.Any())
            {
                return;
            }

            dbContext.Users.Add(new User
            {
                Name = "Joe",
                Email = "test1@gmail.com",
                Salary = 55000,
                Expenses = 2000,
                Account = null,
            });
            dbContext.Users.Add(new User
            {
                Name = "Tom",
                Email = "test2@gmail.com",
                Salary = 135000,
                Expenses = 4400,
                Account = null,
            });
            dbContext.Users.Add(new User
            {
                Name = "Jerry",
                Email = "test3@gmail.com",
                Salary = 100000,
                Expenses = 5000,
                Account = null,
            });
            dbContext.Users.Add(new User
            {
                Name = "Harry",
                Email = "test4@gmail.com",
                Salary = 55000,
                Expenses = 54950,
                Account = null,
            });
            dbContext.SaveChanges();
        }
    }
}
