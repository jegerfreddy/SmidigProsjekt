package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.User;
import loading.smidig.smidig.repository.UserRepository;
import loading.smidig.smidig.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    //Get user by ID
    @GetMapping("/id/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    //Create user
    @PostMapping("/new")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    //Update user
    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    //Delete user by ID
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
