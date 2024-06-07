package loading.smidig.smidig.security;

import loading.smidig.smidig.model.AdminUser;
import loading.smidig.smidig.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<AdminUser> adminUsers = adminUserRepository.findAll();

        AdminUser adminUser = adminUsers.stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElse(null);

        if (adminUser == null) {
            throw new UsernameNotFoundException("User not found");
        }

        if(adminUser.getRole() == null){
            adminUser.setRole("ADMIN");
            adminUserRepository.save(adminUser);
        }

        return User.builder()
                .username(adminUser.getUsername())
                .password(adminUser.getPassword())
                .roles("ADMIN")
                .build();
    }
}
