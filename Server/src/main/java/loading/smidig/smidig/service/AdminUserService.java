package loading.smidig.smidig.service;

import loading.smidig.smidig.model.AdminUser;
import loading.smidig.smidig.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {

    private final AdminUserRepository adminUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AdminUserService(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    //get all admin users
    public List<AdminUser> getAdminUsers() {
        return adminUserRepository.findAll();
    }

    //get admin users by id
    public AdminUser getAdminUserById(Long id) {
        return adminUserRepository.findById(id).orElse(null);
    }

    //create admin user
    public AdminUser createAdminUser(AdminUser adminUser){
        AdminUser user = adminUser;
        user.setPassword(passwordEncoder.encode(adminUser.getPassword()));
        return adminUserRepository.save(adminUser);
    }

    //delete admin user
    public void deleteAdminUserById(Long id) {
        adminUserRepository.deleteById(id);
    }

    //update admin user
    public AdminUser updateAdminUser(AdminUser adminUser) {
        return adminUserRepository.save(adminUser);
    }

    //verify if username and password is correct, returns true if correct
    public boolean verifyAdminUser(AdminUser adminUser) {
        List<AdminUser> adminUsers = adminUserRepository.findAll();
        for (AdminUser user : adminUsers) {
            if (user.getUsername().equals(adminUser.getUsername()) &&
                    passwordEncoder.matches(adminUser.getPassword(), user.getPassword())) {
                return true;
            }
        }
        return false;
    }
}
