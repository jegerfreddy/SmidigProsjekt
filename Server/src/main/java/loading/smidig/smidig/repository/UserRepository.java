package loading.smidig.smidig.repository;

import loading.smidig.smidig.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
