package loading.smidig.smidig.service;

import loading.smidig.smidig.model.AdminUser;
import loading.smidig.smidig.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {

    private final AdminUserRepository adminUserRepository;

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
    public int verifyAdminUser(AdminUser adminUser) throws Exception {
        List<AdminUser> adminUsers = adminUserRepository.findAll();
        for (AdminUser user : adminUsers) {
            if (user.getUsername().equals(adminUser.getUsername()) && user.getPassword().equals(adminUser.getPassword())) {
                return user.getAdminID().intValue();
            }
        }
        throw new Exception("Invalid admin user credentials");
    }

    //Check if username exists in DB
    public boolean checkUsername(String username) {
        List<AdminUser> adminUsers = adminUserRepository.findAll();
        for (AdminUser user : adminUsers) {
            if (user.getUsername().equals(username)) {
                return false;
            }
        }
        return true;
    }
}
