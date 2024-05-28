package loading.smidig.smidig.repository;

import loading.smidig.smidig.model.Act;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ActRepository extends JpaRepository<Act, Long> {
}
