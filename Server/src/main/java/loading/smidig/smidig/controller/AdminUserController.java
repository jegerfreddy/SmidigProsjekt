package loading.smidig.smidig.controller;

import jakarta.servlet.http.Part;
import loading.smidig.smidig.model.AdminUser;
import loading.smidig.smidig.service.AdminUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adminUser")
@CrossOrigin(origins = {"http://localhost:5173", "http://172.26.91.248:3000"})
public class AdminUserController {

    private final AdminUserService adminUserService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    //get all admin users
    @GetMapping("/all")
    public List<AdminUser> getAdminUsers() {
        return adminUserService.getAdminUsers();
    }

    //get admins users by id
    @GetMapping("/id/{id}")
    public AdminUser getAdminById(@PathVariable Long id) {
        logger.info("Fetching admin user by ID: " + id);
        return adminUserService.getAdminUserById(id);
    }

    //create adminUser
    @PostMapping("/new")
    public AdminUser createAdminUser(@RequestBody AdminUser adminUser){
        logger.info("Admin account created:" + adminUser.getUsername());
        return adminUserService.createAdminUser(adminUser);
    }

    //delete admin user
    @DeleteMapping("/delete/{id}")
    public void deleteAdminUser(@PathVariable Long id) {
        logger.info("Admin Account deleted: " + id);
        adminUserService.deleteAdminUserById(id);
    }

    //update adminUser
    @PutMapping("update")
    public AdminUser updateAdminUser(@RequestBody AdminUser adminUser) {
        logger.info("Admin account updated: " + adminUser.getUsername());
        return adminUserService.updateAdminUser(adminUser);
    }

    //Verify if username and password is correct
    @PostMapping("/loginAdmin")
    public boolean verifyAdminUser(@RequestBody AdminUser adminUser) {
        logger.info("Admin account login attempt: " + adminUser.getUsername());
        return adminUserService.verifyAdminUser(adminUser);
    }
}
