package loading.smidig.smidig;

import loading.smidig.smidig.model.AdminUser;
import loading.smidig.smidig.model.User;
import loading.smidig.smidig.repository.ActRepository;
import loading.smidig.smidig.repository.AdminUserRepository;
import loading.smidig.smidig.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SmidigApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmidigApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(
			UserRepository userRepository,
			ActRepository actRepository,
			AdminUserRepository adminUserRepository
	){
		return args ->{

			User user = new User();
			user.setUsername("Per178");
			user.setAvatarNumber(2);

			AdminUser admin = new AdminUser();
			admin.setUsername("Bob123");
			admin.setPassword("passord123");

			userRepository.save(user);
			adminUserRepository.save(admin);

		};
	}

}
