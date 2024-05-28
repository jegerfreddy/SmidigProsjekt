package loading.smidig.smidig.service;

import loading.smidig.smidig.model.User;
import loading.smidig.smidig.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Get user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    //Create/update user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    //Delete user by ID
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    //Get all users
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
