using KLN.Models;
using KLN.Repository;

namespace KLN.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;
        public UserService(UserRepository userRepository) 
        {
            _userRepository = userRepository;
        }
        public List<User> getAllUsers() 
        { 
            return _userRepository.getAllUsers();
        }

    }
}
