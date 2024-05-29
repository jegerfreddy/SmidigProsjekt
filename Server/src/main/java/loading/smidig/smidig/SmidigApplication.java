package loading.smidig.smidig;

import loading.smidig.smidig.model.Act;
import loading.smidig.smidig.model.ActEvent;
import loading.smidig.smidig.repository.ActEventRepository;
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
			AdminUserRepository adminUserRepository,
			ActEventRepository actEventRepository
	){
		return args ->{
			/*
			Act act = new Act();
			act.setActName("Act1");

			ActEvent e1 = new ActEvent("Event 1", "Option 1", "Option 2", "Option 3", "Option 4");
			ActEvent e2 = new ActEvent("Event 2", "Option 1", "Option 2", "Option 3", "Option 4");
			ActEvent e3 = new ActEvent("Event 3", "Option 1", "Option 2", "Option 3", "Option 4");

			e1.setAct(act);
			e2.setAct(act);
			e3.setAct(act);

			act.getEvents().add(e1);
			act.getEvents().add(e2);
			act.getEvents().add(e3);

			actRepository.save(act);
			 */
		};
	}

}
