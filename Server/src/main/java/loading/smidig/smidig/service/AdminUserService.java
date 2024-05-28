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

    public List<AdminUser> getAdminUsers() {
        return adminUserRepository.findAll();
    }

    public AdminUser getAdminUserById(Long id) {
        return adminUserRepository.findById(id).orElse(null);
    }

    public AdminUser createAdminUser(AdminUser adminUser){
        return adminUserRepository.save(adminUser);
    }

    public void deleteAdminUser(AdminUser adminUser) {
        adminUserRepository.delete(adminUser);
    }

    public AdminUser updateAdminUser(AdminUser adminUser) {
        return adminUserRepository.save(adminUser);
    }

}
