package loading.smidig.smidig.controller;

import jakarta.servlet.http.Part;
import loading.smidig.smidig.model.AdminUser;
import loading.smidig.smidig.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adminUser")
public class AdminUserController {

    private final AdminUserService adminUserService;

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
    public AdminUser getPartById(@PathVariable Long id) {
        return adminUserService.getAdminUserById(id);
    }

    //create adminUser
    @PostMapping("/new")
    public AdminUser createAdminUser(@RequestBody AdminUser adminUser){
        return adminUserService.createAdminUser(adminUser);
    }

    //delete admin user
    @DeleteMapping("/delete/{id}")
    public void deleteAdminUser(@PathVariable Long id) {
        adminUserService.deleteAdminUserById(id);
    }

    //update adminUser
    @PutMapping("update")
    public AdminUser updateAdminUser(@RequestBody AdminUser adminUser) {
        return adminUserService.updateAdminUser(adminUser);
    }
}
