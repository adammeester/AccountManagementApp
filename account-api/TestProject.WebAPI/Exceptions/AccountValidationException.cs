using System;

namespace TestProject.WebAPI.Exceptions
{
    public class AccountValidationException : Exception
    {
        public string ErrorMessage {get; set; }
        public AccountValidationException(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }
    }
}
