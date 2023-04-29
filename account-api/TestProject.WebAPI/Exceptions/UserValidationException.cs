using System;

namespace TestProject.WebAPI.Exceptions
{
    public class UserValidationException: Exception
    {
        public string ErrorMessage { get; set; }
        public UserValidationException(string errorMessage)
        {
            ErrorMessage = errorMessage;    
        }
    }
}
